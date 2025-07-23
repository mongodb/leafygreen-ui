/**
 * React wrapper for Apache Echarts.
 * https://echarts.apache.org/en/option.html#title
 *
 * Wraps the Echarts library and provides a React-friendly API. It adds default options
 * and styling according to our design system's specs.
 */
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { ChartProvider } from '../ChartContext';

import {
  chartStyles,
  chartWrapperStyles,
  getChartContainerStyles,
  getChartHeaderContainerStyles,
  getLoadingOverlayStyles,
  getLoadingTextStyles,
} from './Chart.styles';
import { ChartProps, ChartStates } from './Chart.types';
import { useChart } from './hooks';

export function Chart({
  children,
  className,
  darkMode: darkModeProp,
  dragId = '',
  enableGroupTooltipSync = true,
  groupId,
  id: idProp,
  onChartReady,
  onZoomSelect,
  state = ChartStates.Unset,
  zoomSelect,
  ...rest
}: ChartProps) {
  const { theme } = useDarkMode(darkModeProp);
  const chart = useChart({
    chartId: idProp,
    enableGroupTooltipSync,
    groupId,
    onChartReady,
    onZoomSelect,
    state,
    theme,
    zoomSelect,
  });
  const { attributes, listeners, setNodeRef, transform, transition, items } =
    useSortable({ id: dragId });
  const isDraggable = !!(items.length && dragId);

  return (
    <LeafyGreenProvider darkMode={darkModeProp}>
      <ChartProvider chart={chart}>
        <div
          ref={isDraggable ? setNodeRef : null}
          className={cx(
            getChartContainerStyles({
              theme,
              transform,
              transition,
              isDraggable,
              state,
            }),
            className,
          )}
        >
          <div
            className={getChartHeaderContainerStyles({
              theme,
              state,
              isDraggable,
            })}
            data-testid="lg-charts-core-chart-header"
            {...attributes}
            {...listeners}
          >
            {/**
             * Children other than ChartHeader are not expected to be rendered to the DOM,
             * but are used to provide a more declarative API for adding functionality
             * to the chart canvas. They have access to the ChartContext and can be
             * used to add components like Line, ChartGrid, etc.
             */}
            {children}
          </div>
          <div className={chartWrapperStyles}>
            {state === ChartStates.Loading && (
              <div className={getLoadingOverlayStyles(theme)}>
                <Body
                  className={getLoadingTextStyles(theme)}
                  baseFontSize={BaseFontSize.Body2}
                >
                  Loading chart...
                </Body>
              </div>
            )}
            <div
              ref={chart.ref}
              className={chartStyles}
              data-testid="lg-charts-core-chart-echart"
              id={chart.id}
              {...rest}
            />
          </div>
        </div>
      </ChartProvider>
    </LeafyGreenProvider>
  );
}

Chart.displayName = 'Chart';
