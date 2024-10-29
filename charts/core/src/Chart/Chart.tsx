/**
 * React wrapper for Apache Echarts.
 * https://echarts.apache.org/en/option.html#title
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */
import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

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
  const { theme } = useDarkMode(darkModeProp);
  const {
    chartOptions,
    updateChartOptions,
    addChartSeries,
    removeChartSeries,
    chartRef,
  } = useChart({
    theme,
    onChartReady,
  });

  return (
    <LeafyGreenProvider darkMode={darkModeProp}>
      <ChartProvider
        chartOptions={chartOptions}
        updateChartOptions={updateChartOptions}
        addChartSeries={addChartSeries}
        removeChartSeries={removeChartSeries}
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
    </LeafyGreenProvider>
  );
}

Chart.displayName = 'Chart';
