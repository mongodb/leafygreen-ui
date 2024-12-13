import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getDefaultChartOptions } from '../Chart/config';
import { ChartOptions } from '../Chart';
import * as updateUtils from '../Chart/hooks/updateUtils';
import { chartSeriesColors } from '../Chart/chartSeriesColors';
import { EChartsInstance } from './echarts.types';

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
 * Wrapper around the ECharts library. Instantiates and returns an ECharts instance.
 * Provides helper methods to hide ECharts specific logic and provide a clean API
 * for interacting with a chart.
 */
export function useEchart(container: HTMLDivElement | null): EChartsInstance {
  const [echartsInstance, setEchartsInstance] = useState<any>(null); // has to be any since no types exist until import
  const [error, setError] = useState<EChartsInstance['error']>(null);
  const [ready, setReady] = useState<EChartsInstance['ready']>(false);
  const { theme } = useDarkMode();
  const [options, setOptions] = useState<EChartsInstance['options']>(
    getDefaultChartOptions(theme),
  );

  // ECharts does not automatically resize when the window resizes.
  const resizeHandler = () => {
    if (echartsInstance) {
      echartsInstance.resize();
    }
  };

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

    // Cleanup function
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

  const addToGroup: EChartsInstance['addToGroup'] = groupId => {
    echartsInstance.group = groupId;
    echartsCore.connect(groupId);
  };

  const removeFromGroup: EChartsInstance['removeFromGroup'] = () => {
    echartsInstance.group = null;
  };

  const setupZoomSelect: EChartsInstance['setupZoomSelect'] = ({
    xAxis,
    yAxis,
  }) => {
    if (echartsInstance) {
      // `0` index enables zoom on that index, `'none'` disables zoom on that index
      let xAxisIndex: number | string = 0;
      let yAxisIndex: number | string = 0;

      if (!xAxis) {
        xAxisIndex = 'none';
      }

      if (!yAxis) {
        yAxisIndex = 'none';
      }

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

      echartsInstance.on('rendered', () => {
        echartsInstance.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: xAxis || yAxis,
        });
      });

      echartsInstance.on('dataZoom', (params: any) => {
        /**
         * If start is not 0% or end is not 100%, the 'dataZoom' event was triggered by a zoom.
         * We override the zoom to prevent it from actually zooming.
         */
        const isZoomed = params?.start !== 0 || params?.end !== 100;

        if (echartsInstance && isZoomed) {
          echartsInstance.dispatchAction({
            type: 'dataZoom',
            start: 0, // percentage of starting position
            end: 100, // percentage of ending position
          });
        }
      });
    }
  };

  const on: EChartsInstance['on'] = (action, callback) => {
    switch (action) {
      case 'zoomselect': {
        echartsInstance.on('datazoom', (params: any) => {
          callback(params); // TODO: Add logic to parse data
        });
        break;
      }
      default: {
        echartsInstance.on(action, callback);
      }
    }
  };

  const off: EChartsInstance['off'] = (action, callback) => {
    switch (action) {
      case 'zoomselect': {
        echartsInstance.off('datazoom', callback);
        break;
      }
      default: {
        echartsInstance.on(action, callback);
      }
    }
  };

  const setEchartOptions = useMemo(
    () =>
      debounce((options: Partial<ChartOptions>) => {
        /**
         * The second argument is `true` to merge the new options with the existing ones.
         * This is needed to ensure that series get removed properly.
         * See issue: https://github.com/apache/echarts/issues/6202
         * */
        echartsInstance?.setOption(options, true);
      }, 50),
    [],
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
