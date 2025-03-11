import { ChartStates } from '../Chart';
import { ChartCardStates } from '../ChartCard';

import { SortDirection, SortKey, SortOrder } from './Tooltip.types';

/**
 * Gets the echarts sort order based on the sort direction and key
 */
export function getSortOrder(
  direction: SortDirection,
  key: SortKey,
): SortOrder {
  let sortOrder: SortOrder;

  if (direction === SortDirection.Asc) {
    sortOrder = key === SortKey.Name ? SortOrder.SeriesAsc : SortOrder.ValueAsc;
  } else {
    sortOrder =
      key === SortKey.Name ? SortOrder.SeriesDesc : SortOrder.ValueDesc;
  }

  return sortOrder;
}

/**
 * Determines if the tooltip should be shown based on the chart and chart card state
 */
export function shouldShowTooltip({
  chartState,
  chartCardState,
}: {
  chartState?: ChartStates;
  chartCardState?: ChartCardStates;
}) {
  return (
    chartState !== ChartStates.Dragging &&
    chartState !== ChartStates.Overlay &&
    chartCardState !== ChartCardStates.Dragging &&
    chartCardState !== ChartCardStates.Overlay
  );
}
