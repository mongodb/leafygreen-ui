import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getDefaultChartOptions } from '../Chart/config';
import { ChartOptions, SeriesOption } from '../Chart';
import {
  addSeries,
  removeSeries,
  updateOptions,
} from '../Chart/hooks/updateUtils';
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
  const [chart, setChart] = useState<EchartsType | null>(null);
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { theme } = useDarkMode();
  const [chartOptions, setChartOptions] = useState(
    getDefaultChartOptions(theme),
  );

  // ECharts does not automatically resize when the window resizes.
  const resizeHandler = () => {
    if (chart) {
      chart.resize();
    }
  };

  useEffect(() => {
    (async function setupChart() {
      try {
        setIsReady(true);
        setError(null);

        await initializeEcharts();

        if (container) {
          const newChart = echartsCore.init(container);
          newChart.setOption(chartOptions);
          window.addEventListener('resize', resizeHandler);
          setChart(newChart);
        }

        console.log('is ready');
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err
            : new Error('Failed to initialize ECharts'),
        );
      } finally {
        setIsReady(false);
      }
    })();

    // Cleanup function
    return () => {
      if (chart) {
        window.removeEventListener('resize', resizeHandler);
        chart.dispose();
      }
    };
  }, [container]);

  useEffect(() => {
    setChartOptions(currentOptions => {
      const updatedOptions = {
        ...currentOptions,
        color: chartSeriesColors[theme],
      };
      setEchartOptions(updatedOptions);
      return updatedOptions;
    });
  }, [theme]);

  function addToGroup(groupId: string) {
    chart.group = groupId;
    echartsCore.connect(groupId);
  }

  function removeFromGroup() {
    chart.group = null;
  }

  function setupZoomSelect({
    xAxis,
    yAxis,
  }: {
    xAxis?: boolean;
    yAxis?: boolean;
  }) {
    if (chart) {
      // `0` index enables zoom on that index, `'none'` disables zoom on that index
      let xAxisIndex: number | string = 0;
      let yAxisIndex: number | string = 0;

      if (!xAxis) {
        xAxisIndex = 'none';
      }

      if (!yAxis) {
        yAxisIndex = 'none';
      }

      updateChartOptions({
        toolbox: {
          feature: {
            dataZoom: {
              xAxisIndex,
              yAxisIndex,
            },
          },
        },
      });

      chart.on('rendered', () => {
        chart.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: xAxis || yAxis,
        });
      });

      chart.on('dataZoom', (params: any) => {
        /**
         * If start is not 0% or end is not 100%, the 'dataZoom' event was triggered by a zoom.
         * We override the zoom to prevent it from actually zooming.
         */
        const isZoomed = params?.start !== 0 || params?.end !== 100;

        if (chart && isZoomed) {
          chart.dispatchAction({
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
        chart.on('dataZoom', (params: any) => {
          callback(params); // TODO: Add logic to parse data
        });
        break;
      }
      default: {
        chart.on(action, callback);
      }
    }
  }

  function off(action: string, callback: any) {
    chart.off(action, callback);
  }

  const setEchartOptions = useMemo(
    () =>
      debounce((chartOptions: Partial<ChartOptions>) => {
        /**
         * The second argument is `true` to merge the new options with the existing ones.
         * This is needed to ensure that series get removed properly.
         * See issue: https://github.com/apache/echarts/issues/6202
         * */
        chart?.setOption(chartOptions, true);
      }, 50),
    [],
  );

  const addChartSeries = useCallback(
    (data: SeriesOption) => {
      setChartOptions(currentOptions => {
        const updatedOptions = addSeries(currentOptions, data);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const removeChartSeries = useCallback(
    (name: string) => {
      setChartOptions(currentOptions => {
        const updatedOptions = removeSeries(currentOptions, name);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  const updateChartOptions = useCallback(
    (options: Omit<Partial<ChartOptions>, 'series'>) => {
      setChartOptions(currentOptions => {
        const updatedOptions = updateOptions(currentOptions, options);
        setEchartOptions(updatedOptions);
        return updatedOptions;
      });
    },
    [setEchartOptions],
  );

  return {
    chart,
    chartOptions,
    addToGroup,
    removeFromGroup,
    setupZoomSelect,
    on,
    off,
    addChartSeries,
    removeChartSeries,
    updateChartOptions,
    isReady,
    error,
  };
}
