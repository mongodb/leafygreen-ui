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
import { ChartProvider } from '../ChartOptionsContext';
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

export function Chart({ children, darkMode: darkModeProp }: ChartProps) {
  const { chartOptions, updateChartOptions } = useChartOptions({
    darkMode: darkModeProp,
  });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<echarts.EChartsType | undefined>();

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
    chartInstanceRef.current?.setOption(chartOptions);
  }, [chartOptions]);

  return (
    <ChartProvider
      chartOptions={chartOptions}
      updateChartOptions={updateChartOptions}
      darkMode={darkModeProp}
    >
      <div ref={chartRef} className={`echart ${chartStyles}`}>
        {children}
      </div>
    </ChartProvider>
  );
}

Chart.displayName = 'Chart';
