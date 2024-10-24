/**
 * React wrapper for Apache Echarts.
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */
import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ChartProvider } from '../ChartContext';

import { chartStyles, getWrapperStyles } from './Chart.styles';
import { ChartProps } from './Chart.types';
import { useChart } from './hooks';

export function Chart({
  children,
  darkMode: darkModeProp,
  onChartReady,
  className,
  ...rest
}: ChartProps) {
  const {
    chartOptions,
    updateChartOptions,
    addChartSeries,
    removeChartSeries,
    chartRef,
  } = useChart({
    darkMode: darkModeProp,
    onChartReady,
  });
  const { theme } = useDarkMode(darkModeProp);

  return (
    <ChartProvider
      chartOptions={chartOptions}
      updateChartOptions={updateChartOptions}
      addChartSeries={addChartSeries}
      removeChartSeries={removeChartSeries}
      darkMode={darkModeProp}
    >
      <div className={cx(getWrapperStyles(theme), className)} {...rest}>
        {children}
        <div
          ref={chartRef}
          className={`echart ${chartStyles}`}
          data-testid="echart"
        />
      </div>
    </ChartProvider>
  );
}

Chart.displayName = 'Chart';
