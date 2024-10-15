import { useEffect, useRef, useState } from 'react';
import merge from 'lodash.merge';
import { ChartOptions, SeriesOption } from '../Chart.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getDefaultOptions } from '../config/defaultChartOptions';
import { DarkModeProps } from '@leafygreen-ui/lib';

import * as echarts from 'echarts/core';
import { LineChart as EchartsLineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

/**
 * Register the required components. By using separate imports, we can avoid
 * importing the entire echarts library which will reduce the bundle size.
 * Must be added to if additional functionality is supported.
 */
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  EchartsLineChart,
  CanvasRenderer,
  ToolboxComponent,
]);

// TODO: Use when enabling zooming
// function enableZooming(chartInstance: echarts.ECharts) {
//   /**
//    * By default a button click is needed to enable drag zooming.
//    * Dispatching this event enables it instead.
//    */
//   chartInstance.dispatchAction({
//     type: 'takeGlobalCursor',
//     key: 'dataZoomSelect',
//     dataZoomSelectActive: true,
//   });
// }

function enableResize(chartInstance: echarts.ECharts) {
  // ECharts does not automatically resize when the window resizes.
  const resizeHandler = () => {
    chartInstance.resize();
  };
  window.addEventListener('resize', resizeHandler);
  return resizeHandler;
}

let renderCount = 0;

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChart({ darkMode: darkModeProp }: DarkModeProps) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<echarts.EChartsType | undefined>();
  const { theme } = useDarkMode(darkModeProp);
  const [chartOptions, setChartOptions] = useState<Partial<ChartOptions>>(
    getDefaultOptions(theme),
  );

  function addSeries(series: SeriesOption) {
    setChartOptions(currentOptions => {
      if (currentOptions?.series && currentOptions?.series.length > 0) {
        return {
          ...currentOptions,
          series: [...currentOptions?.series, series],
        };
      }
      return {
        ...currentOptions,
        series: [series],
      };
    });
  }

  function updateChartOptions(
    newOptions: Omit<Partial<ChartOptions>, 'series'>,
  ) {
    setChartOptions(currentOptions => {
      return merge({ ...currentOptions }, newOptions);
    });
  }

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;
    chartInstance.setOption(chartOptions);
    const resizeHandler = enableResize(chartInstance);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      chartInstance.dispose();
    };
  }, []);

  useEffect(() => {
    console.log(++renderCount);
    console.log(chartOptions);
    chartInstanceRef.current?.setOption(chartOptions);
  }, [chartOptions]);

  return { chartOptions, updateChartOptions, addSeries, chartRef };
}
