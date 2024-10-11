// import React from 'react';
import { LineChartProps } from './LineChart.types';
// import { Chart, Axis, Grid } from '@lg-charts/core';
// import { ChartHeader } from '@lg-charts/chart-header';

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
  return null;
  // return (
  //   <Chart darkMode={darkModeProp}>
  //     <ChartHeader darkMode={darkModeProp} label={label} />
  //     <Axis x={{ type: 'value' }} y={{ type: 'value' }} />
  //     <Grid vertical horizontal />
  //   </Chart>
  // );
}

LineChart.displayName = 'LineChart';
