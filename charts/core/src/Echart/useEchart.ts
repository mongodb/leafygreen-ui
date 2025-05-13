import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '@lg-charts/colors';
import type { EChartsType } from 'echarts/core';

import { TOOLBOX_ID } from '../constants';

import {
  EChartEvents,
  type EChartHookProps,
  type EChartOptions,
  type EChartsInstance,
  type EChartZoomSelectionEvent,
} from './Echart.types';
import { initializeEcharts } from './initializeEcharts';
import {
  getOptionsToUpdateWithAddedSeries,
  getOptionsToUpdateWithRemovedSeries,
} from './utils';

/**
 * Wrapper around the ECharts library. Instantiates an ECharts instance.
 * Provides helper methods to hide ECharts specific logic and give a cleaner API
 * for interacting with a chart.
 */
export function useEchart({
  container,
  initialOptions,
  theme,
}: EChartHookProps): EChartsInstance {
  const echartsCoreRef = useRef<typeof import('echarts/core') | null>(null);

  const [error, setError] = useState<EChartsInstance['error']>(null);
  const [ready, setReady] = useState<EChartsInstance['ready']>(false);

  // Keep track of active handlers
  const activeHandlers = useRef(new Map());

  const withInstanceCheck = <T extends (...args: Array<any>) => any>(fn: T) => {
    return (...args: Parameters<T>): ReturnType<T> => {
      const echartsInstance = getEchartsInstance();

      if (!echartsInstance) {
        console.error('Echart instance not initialized');
        return undefined as ReturnType<T>;
      }

      return fn(...args);
    };
  };

  const getEchartsInstance = useCallback(() => {
    if (!container) {
      return null;
    }

    const echartsInstance = echartsCoreRef.current?.getInstanceByDom(container);
    return echartsInstance;
  }, [container]);

  const getEchartOptions = withInstanceCheck(() => {
    const echartsInstance = getEchartsInstance();

    return echartsInstance?.getOption();
  });

  const setEchartOptions = withInstanceCheck(
    (options: Partial<EChartOptions>, replaceMerge?: Array<string>) => {
      const echartsInstance = getEchartsInstance();

      /**
       * ECharts has a concept of "component main types" which are the properties under the root option tree
       * in the configuration item manual: https://echarts.apache.org/en/option.html#title
       *
       * e.g. 'series', 'xAxis', 'tooltip', etc.
       *
       * The `replaceMerge` option is used to to achieve targeted adding, updating, and removing of the options
       * in a given ECharts instance.
       *
       * API docs: https://echarts.apache.org/en/api.html#echartsInstance.setOption
       * */
      echartsInstance?.setOption(
        options,
        replaceMerge
          ? {
              replaceMerge,
            }
          : undefined,
      );
    },
  );

  const addSeries: EChartsInstance['addSeries'] = withInstanceCheck(data => {
    const currentOptions = getEchartOptions();
    const newSeriesOptions = getOptionsToUpdateWithAddedSeries(
      currentOptions,
      data,
    );
    setEchartOptions(newSeriesOptions, ['series']);
  });

  const removeSeries: EChartsInstance['removeSeries'] = withInstanceCheck(
    id => {
      const currentOptions = getEchartOptions();
      const newSeriesOptions = getOptionsToUpdateWithRemovedSeries(
        currentOptions,
        id,
      );
      setEchartOptions(newSeriesOptions, ['series']);
    },
  );

  const updateOptions: EChartsInstance['updateOptions'] = withInstanceCheck(
    (options, replaceMerge) => {
      const mergeableOptions = {
        ...options,
      };
      setEchartOptions(mergeableOptions, replaceMerge);
    },
  );

  const updateDataZoom: EChartsInstance['updateOptions'] = withInstanceCheck(
    ({ xAxisIndex, yAxisIndex }) => {
      const mergeableOptions = {
        toolbox: {
          id: TOOLBOX_ID,
          feature: {
            dataZoom: {
              xAxisIndex,
              yAxisIndex,
            },
          },
        },
      };
      setEchartOptions(mergeableOptions, ['toolbox']);
    },
  );

  const addToGroup: EChartsInstance['addToGroup'] = withInstanceCheck(
    (groupId: string) => {
      // echartsCoreRef.current should exist if instance does, but checking for extra safety
      if (!echartsCoreRef.current) {
        return;
      }

      const echartsInstance = getEchartsInstance();

      if ((echartsInstance as EChartsType).group !== groupId) {
        (echartsInstance as EChartsType).group = groupId;
        echartsCoreRef.current.connect(groupId);
      }
    },
  );

  const removeFromGroup: EChartsInstance['removeFromGroup'] = withInstanceCheck(
    () => {
      const echartsInstance = getEchartsInstance();
      (echartsInstance as EChartsType).group = '';
    },
  );

  const clearDataZoom = withInstanceCheck((params: any) => {
    const echartsInstance = getEchartsInstance();

    /**
     * If start is not 0% or end is not 100%, the 'dataZoom' event was
     * triggered by a zoom. We override the zoom to prevent it from actually
     * zooming.
     */
    const isZoomed = params?.start !== 0 || params?.end !== 100;

    if (isZoomed) {
      echartsInstance?.dispatchAction({
        type: 'dataZoom',
        start: 0, // percentage of starting position
        end: 100, // percentage of ending position
      });
    }
  });

  const enableZoom = withInstanceCheck(() => {
    const echartsInstance = getEchartsInstance();

    echartsInstance?.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    });
  });

  const disableZoom = withInstanceCheck(() => {
    const echartsInstance = getEchartsInstance();

    echartsInstance?.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: false,
    });
  });

  const setupZoomSelect: EChartsInstance['setupZoomSelect'] = withInstanceCheck(
    ({ xAxis, yAxis }) => {
      const echartsInstance = getEchartsInstance();

      // `0` index enables zoom on that index, `'none'` disables zoom on that index
      const xAxisIndex: number | string = xAxis ? 0 : 'none';
      const yAxisIndex: number | string = yAxis ? 0 : 'none';

      updateDataZoom({
        xAxisIndex,
        yAxisIndex,
      });

      echartsInstance?.off('dataZoom', clearDataZoom); // prevent adding dupes
      echartsInstance?.on('dataZoom', clearDataZoom);
    },
  );

  const off: EChartsInstance['off'] = withInstanceCheck((action, callback) => {
    const echartsInstance = getEchartsInstance();

    switch (action) {
      case EChartEvents.ZoomSelect: {
        echartsInstance?.off('datazoom', callback);
        // Remove from active handlers
        activeHandlers.current.delete(`${action}-${callback.toString()}`);
        break;
      }

      default: {
        echartsInstance?.off(action, callback);
        activeHandlers.current.delete(`${action}-${callback.toString()}`);
      }
    }
  });

  const on: EChartsInstance['on'] = withInstanceCheck((action, callback) => {
    const echartsInstance = getEchartsInstance();

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
        echartsInstance?.on('datazoom', zoomHandler);
        break;
      }

      default: {
        activeHandlers.current.set(handlerKey, callback);
        echartsInstance?.on(action, callback);
      }
    }
  });

  const hideTooltip = withInstanceCheck(() => {
    const echartsInstance = getEchartsInstance();
    echartsInstance?.dispatchAction({
      type: 'hideTip',
    });
  });

  const resize = withInstanceCheck(() => {
    const echartsInstance = getEchartsInstance();
    echartsInstance?.resize();
  });

  /**
   * CHART INITIALIZATION ---------------------
   * Sets up the echart instance on initial render or if the container changes.
   * Additionally, disposes of echart instance and cleans up handlers on unmount.
   */
  useEffect(() => {
    const activeHandlersMap = activeHandlers.current;
    const echartsInstance = getEchartsInstance();

    setError(null);

    if (!container) return;

    initializeEcharts()
      .then(echartsCore => {
        echartsCoreRef.current = echartsCore;

        if (echartsInstance) {
          return;
        }

        // Init an echart instance
        const newChart = echartsCoreRef.current.init(container, null, {
          devicePixelRatio: window.devicePixelRatio || 1,
          renderer: 'canvas',
        });

        // Set the initial options on the instance
        newChart.setOption(initialOptions || {});

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
      activeHandlersMap.clear();

      if (!!echartsInstance && !echartsInstance.isDisposed()) {
        echartsInstance.dispose();
      }
    };
  }, [container, getEchartsInstance, initialOptions]);

  /**
   * SETTING THEME ---------------------
   * Sets the theme when the instance is created or the theme changes.
   * This is not actually necessary on initial render because the theme
   * is also set on the default options. This is primarily necessary
   * for updating the theme if the theme changes.
   */
  useEffect(() => {
    const echartsInstance = getEchartsInstance();

    if (echartsInstance) {
      const mergeableOptions = {
        color: colors[theme],
      };
      setEchartOptions(mergeableOptions);
    }
  }, [getEchartsInstance, setEchartOptions, theme]);

  return useMemo(
    () => ({
      _getEChartsInstance: getEchartsInstance,
      addSeries,
      addToGroup,
      disableZoom,
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
      updateOptions,
    }),
    [
      addSeries,
      addToGroup,
      disableZoom,
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
      updateOptions,
      getEchartsInstance,
    ],
  );
}
