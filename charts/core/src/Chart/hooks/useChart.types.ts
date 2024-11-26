import { Theme } from '@leafygreen-ui/lib';

export interface ZoomSelectionEvent {
  xAxis: { startValue: number; endValue: number };
  yAxis: { startValue: number; endValue: number };
}

export interface ChartHookProps {
  onChartReady?: () => void;
  zoomable?: boolean;
  onZoomSelect?: (e: ZoomSelectionEvent) => void;
  theme: Theme;
}
