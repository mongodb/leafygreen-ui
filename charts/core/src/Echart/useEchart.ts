import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { EChartsType } from 'echarts/core';
import debounce from 'lodash.debounce';

import { chartSeriesColors } from '../Chart/chartSeriesColors';
import * as updateUtils from '../Chart/hooks/updateUtils';

import {
  EChartEvents,
  type EChartHookProps,
  type EChartOptions,
  type EChartsInstance,
  type EChartZoomSelectionEvent,
} from './Echart.types';
import { initializeEcharts } from './initializeEcharts';

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
  const [echartsInstance, setEchartsInstance] = useState<EChartsType | null>(
    null,
  );
  const [error, setError] = useState<EChartsInstance['error']>(null);
  const [ready, setReady] = useState<EChartsInstance['ready']>(false);
  const [options, setOptions] = useState<EChartsInstance['options']>(
    initialOptions || {},
  );

  // Keep track of active handlers
  const activeHandlers = useRef(new Map());

  const withInstanceCheck = <T extends (...args: Array<any>) => any>(fn: T) => {
    return (...args: Parameters<T>): ReturnType<T> => {
      if (!echartsInstance) {
        console.error('Echart instance not initialized');
        return undefined as ReturnType<T>;
      }

      return fn(...args);
    };
  };

  const setEchartOptions = useMemo(
    () =>
      debounce(
        withInstanceCheck((options: Partial<EChartOptions>) => {
          /**
           * The second argument is `true` to merge the new options with the existing ones.
           * This is needed to ensure that series get removed properly.
           * See issue: https://github.com/apache/echarts/issues/6202
           * */
          echartsInstance?.setOption(options, true);
        }),
        50,
      ),
    [echartsInstance],
  );

  const addSeries: EChartsInstance['addSeries'] = useCallback(
    data => {
      setOptions(currentOptions => {
        const updatedOptions = updateUtils.addSeries(currentOptions, data);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const removeSeries: EChartsInstance['removeSeries'] = useCallback(
    name => {
      setOptions(currentOptions => {
        const updatedOptions = updateUtils.removeSeries(currentOptions, name);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const updateOptions: EChartsInstance['updateOptions'] = useCallback(
    options => {
      setOptions(currentOptions => {
        const updatedOptions = updateUtils.updateOptions(
          currentOptions,
          options,
        );
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const resizeEchartInstance = withInstanceCheck(() => {
    echartsInstance?.resize();
  });

  const addToGroup: EChartsInstance['addToGroup'] = useCallback(
    withInstanceCheck((groupId: string) => {
      // echartsCoreRef.current should exist if instance does, but checking for extra safety
      if (echartsCoreRef.current) {
        if ((echartsInstance as EChartsType).group !== groupId) {
          (echartsInstance as EChartsType).group = groupId;
          echartsCoreRef.current.connect(groupId);
        }
      }
    }),
    [echartsCoreRef.current, echartsInstance],
  );

  const removeFromGroup: EChartsInstance['removeFromGroup'] = useCallback(
    withInstanceCheck(() => {
      (echartsInstance as EChartsType).group = '';
    }),
    [echartsInstance],
  );

  const clearDataZoom = useCallback(
    withInstanceCheck((params: any) => {
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
    }),
    [echartsInstance],
  );

  const setupZoomSelect: EChartsInstance['setupZoomSelect'] = useCallback(
    withInstanceCheck(({ xAxis, yAxis }) => {
      const enableZoom = withInstanceCheck(() => {
        echartsInstance?.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: xAxis || yAxis,
        });
        // This will trigger a render so we need to remove the handler to prevent a loop
        echartsInstance?.off('rendered', enableZoom);
      });

      // `0` index enables zoom on that index, `'none'` disables zoom on that index
      let xAxisIndex: number | string = xAxis ? 0 : 'none';
      let yAxisIndex: number | string = yAxis ? 0 : 'none';

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

      echartsInstance?.on('rendered', enableZoom);
      echartsInstance?.off('dataZoom', clearDataZoom); // prevent adding dupes
      echartsInstance?.on('dataZoom', clearDataZoom);
    }),
    [echartsInstance, updateOptions],
  );

  const off: EChartsInstance['off'] = useCallback(
    withInstanceCheck((action, callback) => {
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
    }),
    [echartsInstance],
  );

  const on: EChartsInstance['on'] = useCallback(
    withInstanceCheck((action, callback) => {
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
    }),
    [echartsInstance],
  );

  const hideTooltip = withInstanceCheck(() => {
    echartsInstance?.dispatchAction({
      type: 'hideTip',
    });
  });

  /**
   * Sets up the echart instance on initial render or if the container changes.
   * Additionally, disposes of echart instance and cleans up handlers on unmount.
   */
  useEffect(() => {
    setError(null);

    initializeEcharts()
      .then(echartsCore => {
        echartsCoreRef.current = echartsCore;

        if (container) {
          // Init an echart instance
          const newChart = echartsCoreRef.current.init(container);
          // Set the initial options on the instance
          newChart.setOption(options);
          // Resize chart when window resizes because echarts don't be default
          window.addEventListener('resize', resizeEchartInstance);

          setEchartsInstance(newChart);
          setReady(true);
        }
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
      window.removeEventListener('resize', resizeEchartInstance);
      activeHandlers.current.clear();

      if (echartsInstance) {
        echartsInstance?.dispose();
      }
    };
  }, [container]);

  /**
   * Sets the theme when the instance is created or the theme changes.
   * This is not actually necessary on initial render because the theme
   * is also set on the default options. This is primarily necessary
   * for updating the theme if the theme changes.
   */
  useEffect(() => {
    if (echartsInstance) {
      setOptions(currentOptions => {
        const updatedOptions = {
          ...currentOptions,
          color: chartSeriesColors[theme],
        };
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    }
  }, [echartsInstance, theme]);

  return {
    _echartsInstance: echartsInstance,
    ready,
    options,
    updateOptions,
    on,
    off,
    addSeries,
    removeSeries,
    addToGroup,
    removeFromGroup,
    setupZoomSelect,
    hideTooltip,
    error,
  };
}
