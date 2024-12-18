import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getDefaultChartOptions } from '../Chart/config';
import { ChartOptions } from '../Chart';
import * as updateUtils from '../Chart/hooks/updateUtils';
import { chartSeriesColors } from '../Chart/chartSeriesColors';
import {
  EChartHookProps,
  EChartsInstance,
  ZoomSelectionEvent,
} from './Echart.types';

// Singleton promise for initialization to prevent duplication
let initPromise: Promise<void> | null = null;
let echartsCore: any;
let echartsCharts: any;
let echartsRenders: any;
let echartsComponents: any;

async function initializeEcharts() {
  // If already initialized, return immediately
  if (echartsCore) {
    return;
  }

  // If initialization is in progress, wait for it
  if (initPromise) {
    return initPromise;
  }

  // Start initialization and store the promise
  initPromise = (async () => {
    try {
      const [
        echartsCoreResolved,
        echartsChartsResolved,
        echartsRendersResolved,
        echartsComponentsResolved,
      ] = await Promise.all([
        import('echarts/core'),
        import('echarts/charts'),
        import('echarts/renderers'),
        import('echarts/components'),
      ]);

      echartsCore = echartsCoreResolved;
      echartsCharts = echartsChartsResolved;
      echartsRenders = echartsRendersResolved;
      echartsComponents = echartsComponentsResolved;

      echartsCore.use([
        echartsCharts.LineChart,
        echartsRenders.CanvasRenderer,
        echartsComponents.TitleComponent,
        echartsComponents.TooltipComponent,
        echartsComponents.GridComponent,
        echartsComponents.LegendComponent,
        echartsComponents.ToolboxComponent,
        echartsComponents.DataZoomComponent,
        echartsComponents.DataZoomInsideComponent,
      ]);
    } catch (error) {
      // Ensure we clear the promise if initialization fails
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

/**
 * Wrapper around the ECharts library. Instantiates an ECharts instance.
 * Provides helper methods to hide ECharts specific logic and give a cleaner API
 * for interacting with a chart.
 */
export function useEchart({
  container,
  initialOptions,
}: EChartHookProps): EChartsInstance {
  const [echartsInstance, setEchartsInstance] = useState<any>(null); // has to be any since no types exist until import
  const [error, setError] = useState<EChartsInstance['error']>(null);
  const [ready, setReady] = useState<EChartsInstance['ready']>(false);
  const { theme } = useDarkMode();
  const [options, setOptions] = useState<EChartsInstance['options']>(
    initialOptions || {},
  );

  // Keep track of active handlers
  const activeHandlers = useRef(new Map());

  const withInstanceCheck = <T extends (...args: any[]) => void>(fn: T) => {
    return (...args: Parameters<T>) => {
      if (!echartsInstance) {
        console.error('Echart instance not initialized');
        return;
      }
      fn(...args);
    };
  };

  const setEchartOptions = useMemo(
    () =>
      debounce(
        withInstanceCheck((options: Partial<ChartOptions>) => {
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

  // ECharts does not automatically resize when the window resizes.
  const resizeHandler = withInstanceCheck(() => {
    echartsInstance.resize();
  });

  const addToGroup: EChartsInstance['addToGroup'] = useCallback(
    withInstanceCheck(groupId => {
      echartsInstance.group = groupId;
      echartsCore.connect(groupId);
    }),
    [echartsCore, echartsInstance],
  );

  const removeFromGroup: EChartsInstance['removeFromGroup'] = useCallback(
    withInstanceCheck(() => {
      echartsInstance.group = null;
    }),
    [echartsInstance],
  );

  const clearDataZoom = useCallback(
    withInstanceCheck((params: any) => {
      /**
       * If start is not 0% or end is not 100%, the 'dataZoom' event was triggered by a zoom.
       * We override the zoom to prevent it from actually zooming.
       */
      const isZoomed = params?.start !== 0 || params?.end !== 100;

      if (isZoomed) {
        echartsInstance.dispatchAction({
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
        echartsInstance.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: xAxis || yAxis,
        });
        // This will trigger a render so we need to remove the handler to prevent a loop
        echartsInstance.off('rendered', enableZoom);
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

      echartsInstance.on('rendered', enableZoom);
      echartsInstance.off('dataZoom', clearDataZoom); // prevent adding dupes
      echartsInstance.on('dataZoom', clearDataZoom);
    }),
    [echartsInstance, updateOptions],
  );

  const off: EChartsInstance['off'] = useCallback(
    withInstanceCheck((action, callback) => {
      switch (action) {
        case 'zoomselect': {
          echartsInstance.off('datazoom', callback);
          // Remove from active handlers
          activeHandlers.current.delete(`${action}-${callback.toString()}`);
          break;
        }
        default: {
          echartsInstance.off(action, callback);
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
        case 'zoomselect': {
          const zoomHandler = (params: any) => {
            const zoomSelectionEvent: ZoomSelectionEvent = {};

            if (
              params.startValue !== undefined &&
              params.endValue !== undefined
            ) {
              // Handle single axis zoom
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
          echartsInstance.on(action, callback);
        }
      }
    }),
    [echartsInstance],
  );

  useEffect(() => {
    (async function setupChart() {
      try {
        setError(null);

        await initializeEcharts();

        if (container) {
          const newChart = echartsCore.init(container);
          newChart.setOption(options);
          window.addEventListener('resize', resizeHandler);
          setEchartsInstance(newChart);
          setReady(true);
        }
      } catch (err) {
        setReady(false);
        console.error(err);
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to initialize ECharts'),
        );
      }
    })();

    return () => {
      if (echartsInstance) {
        window.removeEventListener('resize', resizeHandler);
        echartsInstance.dispose();
      }
    };
  }, [container]);

  useEffect(() => {
    setOptions(currentOptions => {
      const updatedOptions = {
        ...currentOptions,
        color: chartSeriesColors[theme],
      };
      setEchartOptions(updatedOptions);
      return updatedOptions;
    });
  }, [theme]);

  // Clean up all handlers when the echartsInstance changes
  useEffect(() => {
    return () => {
      if (echartsInstance) {
        // Remove all registered handlers
        activeHandlers.current.forEach((handler, key) => {
          const [action] = key.split('-');
          if (action === 'zoomselect') {
            echartsInstance.off('datazoom', handler);
          } else {
            echartsInstance.off(action, handler);
          }
        });
        activeHandlers.current.clear();
      }
    };
  }, [echartsInstance]);

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
    error,
  };
}
