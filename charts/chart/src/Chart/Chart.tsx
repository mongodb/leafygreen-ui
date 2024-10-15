/**
 * React wrapper for Apache Echarts.
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */
import React from 'react';
import { ChartProps } from './Chart.types';
import { chartStyles, getWrapperStyles } from './Chart.styles';
import { ChartProvider } from '../ChartContext';
import { useChart } from './hooks/useChart';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export function Chart({
  children,
  darkMode: darkModeProp,
  onChartReady,
}: ChartProps) {
  const {
    chartOptions,
    updateChartOptions,
    addSeries,
    removeSeries,
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
      addSeries={addSeries}
      removeSeries={removeSeries}
      darkMode={darkModeProp}
    >
      <div className={getWrapperStyles(theme)}>
        {children}
        <div ref={chartRef} className={`echart ${chartStyles}`} />
      </div>
    </ChartProvider>
  );
}

Chart.displayName = 'Chart';
