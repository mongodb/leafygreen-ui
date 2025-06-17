import { useCallback, useEffect, useRef, useState } from 'react';
import { colors } from '@lg-charts/colors';
import type { EChartsType } from 'echarts/core';
import isEqual from 'lodash/isEqual';

import { usePrevious } from '@leafygreen-ui/hooks';

import {
  EChartEvents,
  type EChartHookProps,
  type EChartOptions,
  type EChartsInstance,
  type EChartZoomSelectionEvent,
} from './Echart.types';
import { initializeEcharts } from './initializeEcharts';
import * as utils from './utils';

/**
 * Wrapper around the ECharts library. Instantiates an ECharts instance.
 * Provides helper methods to hide ECharts specific logic and give a cleaner API
 * for interacting with a chart.
 */
export function useEchart({
  container,
  initialOptions,
  shouldEnableZoom = false,
  theme,
}: EChartHookProps): EChartsInstance {
  const echartsCoreRef = useRef<typeof import('echarts/core') | null>(null);
  const echartsInstanceRef = useRef<EChartsType | null>(null);
  const initialOptionsRef = useRef(initialOptions);

  const [options, setOptions] = useState<EChartOptions>(
    initialOptionsRef.current || {},
  );
  const previousOptions = usePrevious(options);
  const [error, setError] = useState<EChartsInstance['error']>(null);
  const [ready, setReady] = useState<EChartsInstance['ready']>(false);

  // Keep track of active handlers
  const activeHandlers = useRef(new Map());

  const addSeries: EChartsInstance['addSeries'] = useCallback(
    data => {
      if (!echartsInstanceRef.current) {
        return;
      }

      setOptions(prevOptions => {
        const updatedOptions = utils.addSeries(prevOptions, data);
        return updatedOptions;
      });
    },
    [setOptions],
  );

  const removeSeries: EChartsInstance['removeSeries'] = useCallback(
    name => {
      if (!echartsInstanceRef.current) {
        return;
      }

      setOptions(prevOptions => {
        const updatedOptions = utils.removeSeries(prevOptions, name);
        return updatedOptions;
      });
    },
    [setOptions],
  );

  const updateOptions: EChartsInstance['updateOptions'] = useCallback(
    options => {
      if (!echartsInstanceRef.current) {
        return;
      }

      setOptions(prevOptions => {
        const updatedOptions = utils.updateOptions(prevOptions, options);
        return updatedOptions;
      });
    },
    [setOptions],
  );

  const addToGroup: EChartsInstance['addToGroup'] = useCallback(
    (groupId: string) => {
      const echartsInstance = echartsInstanceRef.current;
      const isInstanceAlreadyGrouped = echartsInstance?.group === groupId;

      // echartsCoreRef.current should exist if instance does, but checking for extra safety
      if (
        !echartsCoreRef.current ||
        !echartsInstance ||
        isInstanceAlreadyGrouped
      ) {
        return;
      }

      echartsInstance.group = groupId;
      echartsCoreRef.current.connect(groupId);
    },
    [],
  );

  const removeFromGroup: EChartsInstance['removeFromGroup'] =
    useCallback(() => {
      const echartsInstance = echartsInstanceRef.current;

      if (!echartsInstance) {
        return;
      }

      echartsInstance.group = '';
    }, []);

  const clearDataZoom = useCallback((params: any) => {
    const echartsInstance = echartsInstanceRef.current;

    /**
     * If start is not 0% or end is not 100%, the 'dataZoom' event was
     * triggered by a zoom. We override the zoom to prevent it from actually
     * zooming.
     */
    const isZoomed = params?.start !== 0 || params?.end !== 100;

    if (!isZoomed || !echartsInstance) {
      return;
    }

    echartsInstance.dispatchAction({
      type: 'dataZoom',
      start: 0, // percentage of starting position
      end: 100, // percentage of ending position
    });
  }, []);

  const enableZoom = useCallback(() => {
    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    echartsInstance.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    });
  }, []);

  const setupZoomSelect: EChartsInstance['setupZoomSelect'] = useCallback(
    ({ xAxis, yAxis }) => {
      const echartsInstance = echartsInstanceRef.current;

      if (!echartsInstance) {
        return;
      }

      // `0` index enables zoom on that index, `'none'` disables zoom on that index
      const xAxisIndex: number | string = xAxis ? 0 : 'none';
      const yAxisIndex: number | string = yAxis ? 0 : 'none';

      updateOptions({
        toolbox: {
          feature: {
            dataZoom: {
              xAxisIndex,
              yAxisIndex,
            },
          },
        },
      });

      echartsInstance.off('dataZoom', clearDataZoom); // prevent adding dupes
      echartsInstance.on('dataZoom', clearDataZoom);
    },
    [clearDataZoom, updateOptions],
  );

  const off: EChartsInstance['off'] = useCallback(
    (action, callback, options) => {
      const echartsInstance = echartsInstanceRef.current;

      if (!echartsInstance) {
        return;
      }

      switch (action) {
        case EChartEvents.ZoomSelect: {
          echartsInstance.off('datazoom', callback);
          // Remove from active handlers
          activeHandlers.current.delete(`${action}-${callback.toString()}`);
          break;
        }

        default: {
          options?.useCanvasAsTrigger
            ? echartsInstance.getZr().off(action, callback)
            : echartsInstance.off(action, callback);
          activeHandlers.current.delete(`${action}-${callback.toString()}`);
        }
      }
    },
    [],
  );

  const on: EChartsInstance['on'] = useCallback((action, callback, options) => {
    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    // Create a unique key for this handler
    const handlerKey = `${action}-${callback.toString()}`;

    // If this exact handler is already registered, skip
    if (activeHandlers.current.has(handlerKey)) {
      return;
    }

    switch (action) {
      case EChartEvents.ZoomSelect: {
        const zoomHandler = (params: any) => {
          const zoomSelectionEvent: EChartZoomSelectionEvent = {};
          const isSingleAxisZoom =
            params.startValue !== undefined && params.endValue !== undefined;

          if (isSingleAxisZoom) {
            const axis = params.dataZoomId?.includes('y') ? 'yAxis' : 'xAxis';
            zoomSelectionEvent[axis] = {
              startValue: params.startValue,
              endValue: params.endValue,
            };
            callback(zoomSelectionEvent);
          } else if (params.batch) {
            // Handle batch zoom (multiple axes)
            params.batch.forEach((batchItem: any) => {
              if (batchItem.dataZoomId?.includes('y')) {
                zoomSelectionEvent.yAxis = {
                  startValue: batchItem.startValue,
                  endValue: batchItem.endValue,
                };
              } else {
                zoomSelectionEvent.xAxis = {
                  startValue: batchItem.startValue,
                  endValue: batchItem.endValue,
                };
              }
            });
            callback(zoomSelectionEvent);
          }
        };

        // Store the wrapper function so we can remove it later
        activeHandlers.current.set(handlerKey, zoomHandler);
        echartsInstance.on('datazoom', zoomHandler);
        break;
      }

      default: {
        activeHandlers.current.set(handlerKey, callback);
        options?.useCanvasAsTrigger
          ? echartsInstance.getZr().on(action, callback)
          : echartsInstance.on(action, callback as (...args: any) => void);
      }
    }
  }, []);

  const showTooltip: EChartsInstance['showTooltip'] = useCallback((x, y) => {
    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    echartsInstance.dispatchAction({
      type: 'showTip',
      x,
      y,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    echartsInstance.dispatchAction({
      type: 'hideTip',
    });
  }, []);

  const resize = useCallback(() => {
    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    echartsInstance.resize();
  }, []);

  /**
   * CHART INITIALIZATION ---------------------
   * Sets up the echart instance on initial render or if the container changes.
   * Additionally, disposes of echart instance and cleans up handlers on unmount.
   */
  useEffect(() => {
    const activeHandlersMap = activeHandlers.current;

    setError(null);

    const echartsInstance = echartsInstanceRef.current;
    const doesInstanceMatchContainer = echartsInstance
      ? echartsInstance.getDom() === container
      : false;
    const isInstanceDisposed = echartsInstance
      ? echartsInstance.isDisposed()
      : false;

    if (!container || (doesInstanceMatchContainer && !isInstanceDisposed)) {
      return;
    }

    initializeEcharts()
      .then(echartsCore => {
        echartsCoreRef.current = echartsCore;

        // Init an echart instance
        const newChart = echartsCoreRef.current.init(container, null, {
          devicePixelRatio: window.devicePixelRatio || 1,
          renderer: 'canvas',
        });

        // Set the initial options on the instance
        newChart.setOption(initialOptionsRef.current || {});

        // Set the echarts instance ref
        echartsInstanceRef.current = newChart;

        setReady(true);
      })
      .catch(err => {
        setReady(false);
        console.error(err);
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to initialize ECharts'),
        );
      });

    return () => {
      if (
        !echartsInstance ||
        isInstanceDisposed ||
        !doesInstanceMatchContainer
      ) {
        return;
      }

      activeHandlersMap.clear();
      echartsInstance.dispose();
      echartsInstanceRef.current = null;
    };
  }, [container]);

  /**
   * SETTING THEME ---------------------
   * Sets the theme when the instance is created or the theme changes.
   * This is not actually necessary on initial render because the theme
   * is also set on the default options. This is primarily necessary
   * for updating the theme if the theme changes.
   */
  useEffect(() => {
    if (!ready) {
      return;
    }

    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    setOptions(prevOptions => {
      const updatedOptions = {
        ...prevOptions,
        color: colors[theme],
      };
      return updatedOptions;
    });
  }, [ready, theme]);

  /**
   * UPDATING OPTIONS ---------------------
   * Sets the options on the instance when the options meaningfully change.
   *
   * The `notMerge` option set to true means that all of the current echarts
   * components will be removed and new components will be created according
   * to the new options object.
   *
   * API docs: https://echarts.apache.org/en/api.html#echartsInstance.setOption
   */
  useEffect(() => {
    const echartsInstance = echartsInstanceRef.current;

    if (!echartsInstance) {
      return;
    }

    if (isEqual(options, previousOptions)) {
      return;
    }

    echartsInstance.setOption(options, {
      notMerge: true,
    });

    if (shouldEnableZoom) {
      enableZoom();
    }
  }, [enableZoom, options, previousOptions, shouldEnableZoom]);

  return {
    _getEChartsInstance: () => echartsInstanceRef.current,
    _getOptions: () => options,
    addSeries,
    addToGroup,
    enableZoom,
    error,
    hideTooltip,
    off,
    on,
    ready,
    removeFromGroup,
    removeSeries,
    resize,
    setupZoomSelect,
    showTooltip,
    updateOptions,
  };
}
