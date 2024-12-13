import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getDefaultChartOptions } from '../Chart/config';
import { ChartOptions, SeriesOption } from '../Chart';
import * as updateUtils from '../Chart/hooks/updateUtils';
import { chartSeriesColors } from '../Chart/chartSeriesColors';

type EchartsType = any; // has to be any since no types exist until import

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

export function useEchart(container: HTMLDivElement | null) {
  const [chartInstance, setChartInstance] = useState<EchartsType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useDarkMode();
  const [options, setOptions] = useState(getDefaultChartOptions(theme));

  // ECharts does not automatically resize when the window resizes.
  const resizeHandler = () => {
    if (chartInstance) {
      chartInstance.resize();
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
          setChartInstance(newChart);
        }
      } catch (err) {
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
      if (chartInstance) {
        window.removeEventListener('resize', resizeHandler);
        chartInstance.dispose();
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

  function addToGroup(groupId: string) {
    chartInstance.group = groupId;
    echartsCore.connect(groupId);
  }

  function removeFromGroup() {
    chartInstance.group = null;
  }

  function setupZoomSelect({
    xAxis,
    yAxis,
  }: {
    xAxis?: boolean;
    yAxis?: boolean;
  }) {
    if (chartInstance) {
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

      chartInstance.on('rendered', () => {
        chartInstance.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: xAxis || yAxis,
        });
      });

      chartInstance.on('dataZoom', (params: any) => {
        /**
         * If start is not 0% or end is not 100%, the 'dataZoom' event was triggered by a zoom.
         * We override the zoom to prevent it from actually zooming.
         */
        const isZoomed = params?.start !== 0 || params?.end !== 100;

        if (chartInstance && isZoomed) {
          chartInstance.dispatchAction({
            type: 'dataZoom',
            start: 0, // percentage of starting position
            end: 100, // percentage of ending position
          });
        }
      });
    }
  }

  // TODO: update type
  function on(action: 'zoomSelect' | string, callback: any) {
    switch (action) {
      case 'zoomSelect': {
        chartInstance.on('dataZoom', (params: any) => {
          callback(params); // TODO: Add logic to parse data
        });
        break;
      }
      default: {
        chartInstance.on(action, callback);
      }
    }
  }

  function off(action: string, callback: any) {
    chartInstance.off(action, callback);
  }

  const setEchartOptions = useMemo(
    () =>
      debounce((options: Partial<ChartOptions>) => {
        /**
         * The second argument is `true` to merge the new options with the existing ones.
         * This is needed to ensure that series get removed properly.
         * See issue: https://github.com/apache/echarts/issues/6202
         * */
        chartInstance?.setOption(options, true);
      }, 50),
    [],
  );

  const addSeries = useCallback(
    (data: SeriesOption) => {
      setOptions(currentOptions => {
        const updatedOptions = updateUtils.addSeries(currentOptions, data);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const removeSeries = useCallback(
    (name: string) => {
      setOptions(currentOptions => {
        const updatedOptions = updateUtils.removeSeries(currentOptions, name);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const updateOptions = useCallback(
    (options: Omit<Partial<ChartOptions>, 'series'>) => {
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
    instance: chartInstance,
    options,
    addToGroup,
    removeFromGroup,
    setupZoomSelect,
    on,
    off,
    addSeries,
    removeSeries,
    updateOptions,
    error,
  };
}
