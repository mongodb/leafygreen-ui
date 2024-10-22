/**
 * React wrapper for Apache Echarts.
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */
import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ChartProvider } from '../ChartContext';

import { useChart } from './hooks';
import { chartStyles, getWrapperStyles } from './Chart.styles';
import { ChartProps } from './Chart.types';

export function Chart({
  children,
  darkMode: darkModeProp,
  onChartReady,
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
      <div className={getWrapperStyles(theme)}>
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
