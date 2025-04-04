import { ChartCardStates } from '@lg-charts/chart-card';

import { ChartStates } from '../Chart';

/**
 * Determines if the tooltip should be shown based on the chart and chart card state
 *
 * Showing the tooltip in ChartStates.Dragging or ChartStates.Overlay causes issues with drag and drop
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
