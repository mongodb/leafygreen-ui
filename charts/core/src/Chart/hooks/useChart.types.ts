import { Theme } from '@leafygreen-ui/lib';

export interface ZoomSelectionEvent {
  xAxis?: { startValue: number; endValue: number };
  yAxis?: { startValue: number; endValue: number };
}

export interface zoomSelect {
  /**
   * Should zoom selection be enabled on the x-axis.
   */
  xAxis?: boolean;

  /**
   * Should zoom selection be enabled on the y-axis.
   */
  yAxis?: boolean;

  /**
   * Callback to be called when a zoom selection is made.
   */
  onZoomSelect?: (e: ZoomSelectionEvent) => void;
}

export interface ChartHookProps {
  onChartReady?: () => void;
  zoomSelect?: zoomSelect;
  theme: Theme;
}
