import { type DarkModeProps } from '@leafygreen-ui/lib';
import { SeriesOption } from '@lg-charts/core';

export interface Series extends SeriesOption {
  name: string;
  data: Array<[Date, number]>;
}

export interface TimeSeriesLineChartProps extends DarkModeProps {
  data: Array<Series>;
}
