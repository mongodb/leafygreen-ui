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

import { chartContainerStyles, chartStyles } from './Chart.styles';
import { ChartProps } from './Chart.types';
import { useChart } from './hooks';

export function Chart({
  children,
  darkMode: darkModeProp,
  onChartReady,
  zoomable,
  onZoomSelect,
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
    zoomable,
    onZoomSelect,
  });

  return (
    <LeafyGreenProvider darkMode={darkModeProp}>
      <ChartProvider
        chartOptions={chartOptions}
        updateChartOptions={updateChartOptions}
        addChartSeries={addChartSeries}
        removeChartSeries={removeChartSeries}
      >
        <div className={cx(chartContainerStyles, className)}>
          <div>
            {/**
             * Children other than Header are not expected to be rendered to the DOM,
             * but are used to provide a more declarative API for adding functionality
             * to the chart canvas. They have access to the ChartContext and can be
             * used to add components like Line, Grid, etc.
             */}
            {children}
          </div>
          <div
            ref={chartRef}
            className={chartStyles}
            data-testid="lg-charts-core-chart-echart"
            {...rest}
          />
        </div>
      </ChartProvider>
    </LeafyGreenProvider>
  );
}

Chart.displayName = 'Chart';
