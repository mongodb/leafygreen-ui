import React from 'react';
import { LineChartProps } from './LineChart.types';
import { Chart } from '../Chart';
import { ChartHeader } from '../ChartHeader';
import { Axis } from '../Axis';
import { Grid } from '../Grid/Grid';

export function LineChart({
  series,
  label,
  xAxis,
  yAxis,
  closeButtonProps,
  expandButtonProps,
  draggable,
  onDrag,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  darkMode: darkModeProp,
  ...rest
}: LineChartProps) {
  return (
    <Chart darkMode={darkModeProp}>
      <ChartHeader darkMode={darkModeProp} label={label} />
      <Axis x={{ type: 'value' }} y={{ type: 'value' }} />
      <Grid vertical horizontal />
    </Chart>
  );
}

LineChart.displayName = 'LineChart';
