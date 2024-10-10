/**
 * React wrapper for Apache Echarts.
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */

import React, { useEffect, useRef } from 'react';
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

import { ChartProps } from './Chart.types';
import { chartStyles } from './Chart.styles';
import { useChartOptions } from './hooks/useChartOptions';

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

export function Chart({ options, darkMode: darkModeProp }: ChartProps) {
  const { chartOptions } = useChartOptions({
    options,
    darkMode: darkModeProp,
  });
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(chartOptions);
    const resizeHandler = enableResize(chartInstance);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      chartInstance.dispose();
    };
  }, [chartOptions]);

  return <div ref={chartRef} className={`echart ${chartStyles}`} />;
}

Chart.displayName = 'Chart';
