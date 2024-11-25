import { Theme } from '@leafygreen-ui/lib';

export interface OnZoomProps {
  xAxis: { startValue: number; endValue: number };
  yAxis: { startValue: number; endValue: number };
}

export interface ChartHookProps {
  onChartReady?: () => void;
  onZoom?: (props: OnZoomProps) => void;
  theme: Theme;
}
