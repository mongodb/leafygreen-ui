import { Theme } from '@leafygreen-ui/lib';

export interface ZoomEvent {
  xAxis: { startValue: number; endValue: number };
  yAxis: { startValue: number; endValue: number };
}

export interface ChartHookProps {
  onChartReady?: () => void;
  onZoom?: (e: ZoomEvent) => void;
  theme: Theme;
}
