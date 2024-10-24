import { SeriesOption } from '@lg-charts/core';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface Series extends SeriesOption {
  name: string;
  data: Array<[Date, number]>;
}

export interface LineChartProps extends HTMLElementProps<'div'>, DarkModeProps {
  data: Array<Series>;
}
