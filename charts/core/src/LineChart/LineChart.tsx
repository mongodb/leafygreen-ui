import React from 'react';
import { LineChartProps } from './LineChart.types';
import { getWrapperStyles } from './LineChart.styles';
import { Chart } from '../Chart';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
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
  const { theme } = useDarkMode(darkModeProp);

  return (
    <div className={getWrapperStyles(theme)} {...rest}>
      <ChartHeader darkMode={darkModeProp} label={label} />
      <Chart darkMode={darkModeProp}>
        <Axis x={{ type: 'value' }} y={{ type: 'value' }} />
        <Grid vertical horizontal />
      </Chart>
    </div>
  );
}

LineChart.displayName = 'LineChart';
