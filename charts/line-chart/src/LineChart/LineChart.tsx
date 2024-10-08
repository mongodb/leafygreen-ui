import React from 'react';
import { Body } from '@leafygreen-ui/typography';

import { LineChartProps } from './LineChart.types';
import { baseStyles, headerStyles } from './LineChart.styles';
import { Chart } from '../Chart';
// import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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
  //const { theme } = useDarkMode(darkModeProp);

  return (
    <div className={baseStyles} {...rest}>
      <header className={headerStyles}>
        <Body weight="regular" baseFontSize={16}>
          {label}
        </Body>
      </header>
      <Chart
        series={series}
        xAxis={xAxis}
        yAxis={yAxis}
        darkMode={darkModeProp}
      />
    </div>
  );
}

LineChart.displayName = 'LineChart';
