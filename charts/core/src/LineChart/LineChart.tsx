import React from 'react';
import { LineChartProps } from './LineChart.types';
import { getWrapperStyles } from './LineChart.styles';
import { Chart } from '../Chart';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ChartHeader } from '../ChartHeader';
import { XAxis } from '../XAxis';

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
  const [updateChartOptions, setShowXAxis] = React.useState(false);

  setTimeout(() => {
    setShowXAxis(true);
  }, 4000);

  return (
    <div className={getWrapperStyles(theme)} {...rest}>
      <ChartHeader darkMode={darkModeProp} label={label} />
      <Chart darkMode={darkModeProp}>{updateChartOptions && <XAxis />}</Chart>
    </div>
  );
}

LineChart.displayName = 'LineChart';
