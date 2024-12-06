import { Theme } from '@leafygreen-ui/lib';

export interface ZoomSelectionEvent {
  xAxis?: { startValue: number; endValue: number };
  yAxis?: { startValue: number; endValue: number };
}

export interface ZoomSelect {
  /**
   * Should zoom selection be enabled on the x-axis.
   */
  xAxis?: boolean;

  /**
   * Should zoom selection be enabled on the y-axis.
   */
  yAxis?: boolean;
}

export interface ChartHookProps {
  groupId?: string;
  theme: Theme;

  /**
   * Callback to be called when chart is finished rendering.
   */
  onChartReady?: () => void;

  /**
   * Zoom selection enablement configuration.
   */
  zoomSelect?: ZoomSelect;

  /**
   * Callback to be called when a zoom selection is made.
   */
  onZoomSelect?: (e: ZoomSelectionEvent) => void;
}
