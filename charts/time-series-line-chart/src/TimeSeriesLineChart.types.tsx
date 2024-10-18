import { SeriesOption } from '@lg-charts/core';

import { type DarkModeProps } from '@leafygreen-ui/lib';

export interface Series extends SeriesOption {
  name: string;
  data: Array<[Date, number]>;
}

export interface TimeSeriesLineChartProps extends DarkModeProps {
  data: Array<Series>;
}
