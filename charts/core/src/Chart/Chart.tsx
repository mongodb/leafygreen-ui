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
import { Spinner } from '@leafygreen-ui/loading-indicator';

import { ChartProvider } from '../ChartContext';

import {
  chartContainerStyles,
  chartHeaderContainerStyles,
  chartStyles,
  chartWrapperStyles,
  loadingOverlayStyles,
} from './Chart.styles';
import { ChartProps, ChartStates } from './Chart.types';
import { useChart } from './hooks';

export function Chart({
  children,
  darkMode: darkModeProp,
  onChartReady,
  zoomSelect,
  onZoomSelect,
  groupId,
  className,
  chartState = ChartStates.Unset,
  ...rest
}: ChartProps) {
  const { theme } = useDarkMode(darkModeProp);
  const chart = useChart({
    theme,
    onChartReady,
    zoomSelect,
    onZoomSelect,
    groupId,
  });

  return (
    <LeafyGreenProvider darkMode={darkModeProp}>
      <ChartProvider chart={chart}>
        <div className={cx(chartContainerStyles, className)}>
          <div className={chartHeaderContainerStyles}>
            {/**
             * Children other than Header are not expected to be rendered to the DOM,
             * but are used to provide a more declarative API for adding functionality
             * to the chart canvas. They have access to the ChartContext and can be
             * used to add components like Line, Grid, etc.
             */}
            {children}
          </div>
          <div className={chartWrapperStyles}>
            {chartState === ChartStates.Loading && (
              <div className={loadingOverlayStyles}>
                <Spinner description="Loading chart..." />
              </div>
            )}
            <div
              ref={chart.ref}
              className={chartStyles}
              data-testid="lg-charts-core-chart-echart"
              {...rest}
            />
          </div>
        </div>
      </ChartProvider>
    </LeafyGreenProvider>
  );
}

Chart.displayName = 'Chart';
