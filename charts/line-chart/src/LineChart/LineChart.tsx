import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import { LineChartProps } from './LineChart.types';
import { baseStyles, headerStyles } from './LineChart.styles';
import { Chart } from '../Chart';

export function LineChart({
  series,
  label,
  xAxis,
  yAxis,
  showControls,
  onInfoClick,
  onClose,
  onExpand,
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
    <div className={baseStyles} {...rest}>
      <header className={headerStyles}>
        <Body weight="regular" baseFontSize={16}>
          {label}
        </Body>
      </header>
      <Chart
        options={{
          series: series.map(({ name, data }) => ({
            name,
            data,
            type: 'line',
          })),
          xAxis: {
            // Defaults to 'time' type in order to default time-series line chart
            type: xAxis?.type || 'time',
            min: xAxis?.min,
            max: xAxis?.max,
            unit: xAxis?.unit,
          },
          yAxis: {
            // Defaults to 'value' type in order to default time-series line chart
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
