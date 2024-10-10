import React from 'react';
import { LineChartProps } from './LineChart.types';
import { getWrapperStyles } from './LineChart.styles';
import { Chart } from '../Chart';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ChartHeader } from '../ChartHeader';

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
  const { theme } = useDarkMode(darkModeProp);

  return (
    <div className={getWrapperStyles(theme)} {...rest}>
      <ChartHeader darkMode={darkModeProp} label={label} />
      <Chart
        options={{
          series: series.map(({ name, data }) => ({
            type: 'line', // This makes sure that each series passed in is a line series
            name,
            data,
          })),
          xAxis: {
            // Defaults to 'time' type in order to default to time-series line chart
            type: xAxis?.type || 'time',
            min: xAxis?.min,
            max: xAxis?.max,
            unit: xAxis?.unit,
          },
          yAxis: {
            // Defaults to 'value' type in order to default to time-series line chart
            type: yAxis?.type || 'value',
            min: yAxis?.min,
            max: yAxis?.max,
            unit: yAxis?.unit,
          },
        }}
        darkMode={darkModeProp}
      />
    </div>
  );
}

LineChart.displayName = 'LineChart';
