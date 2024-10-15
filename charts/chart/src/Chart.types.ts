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
  children?: React.ReactNode;
  onChartReady?: () => void;
}

export const ChartActionType = {
  addSeries: 'addSeries',
  removeSeries: 'removeSeries',
  updateOptions: 'updateOptions',
} as const;

interface AddSeriesAction {
  type: typeof ChartActionType.addSeries;
  data: SeriesOption;
}

interface RemoveSeriesAction {
  type: typeof ChartActionType.removeSeries;
  name: string;
}

interface UpdateOptionsAction {
  type: typeof ChartActionType.updateOptions;
  options: Partial<Omit<ChartOptions, 'series'>>;
}

export type ChartAction =
  | AddSeriesAction
  | RemoveSeriesAction
  | UpdateOptionsAction;
