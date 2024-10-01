import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  LineChart as EchartsLineChart,
  LineSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { LineChartProps } from './LineChart.types';

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
export function LineChart({}: LineChartProps) {
  return <>LineChart</>;
}

LineChart.displayName = 'LineChart';
