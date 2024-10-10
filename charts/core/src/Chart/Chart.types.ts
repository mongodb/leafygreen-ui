import { type DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';
import { LineSeriesOption } from 'echarts';

type RequiredSeriesProps = 'type' | 'name' | 'data';
export type SeriesOption = Pick<LineSeriesOption, RequiredSeriesProps> &
  Partial<Omit<LineSeriesOption, RequiredSeriesProps>>;

export interface ChartOptions {
  series: Array<SeriesOption>;
  [key: string]: any;
}

export interface ChartProps extends HTMLElementProps<'div'>, DarkModeProps {
  options: ChartOptions;
}
