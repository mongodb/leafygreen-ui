import React from 'react';
import { LineChart as EchartsLineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components. By using separate imports, we can avoid
// importing the entire echarts library which will reduce the bundle size.
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  EchartsLineChart,
  CanvasRenderer,
]);

// TODO: forwardRef
export function LineChart() {
  return <>LineChart</>;
}

LineChart.displayName = 'LineChart';
