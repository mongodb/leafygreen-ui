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
 * Must bee added to if additional functionality is supported.
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

/**
 * React wrapper for Apache Echarts.
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */
export function Chart({ options, darkMode: darkModeProp }: ChartProps) {
  const chartOptions = useChartOptions({ options, darkMode: darkModeProp });
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(chartOptions);

    // This enables zooming by default without the need to click a zoom button in the toolbox.
    chartInstance.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    });

    // ECharts does not automatically resize when the window resizes so we need to handle it manually.
    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [chartOptions]);

  return <div ref={chartRef} className={`echart ${chartStyles}`} />;
}

Chart.displayName = 'Chart';
