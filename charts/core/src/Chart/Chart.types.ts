import type { XAXisComponentOption, YAXisComponentOption } from 'echarts';
import type { LineSeriesOption } from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

import { type DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';

type RequiredSeriesProps = 'type' | 'name' | 'data';
export type SeriesOption = Pick<LineSeriesOption, RequiredSeriesProps> &
  Partial<Omit<LineSeriesOption, RequiredSeriesProps>>;

export type ChartOptions = ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | TitleComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | XAXisComponentOption
  | YAXisComponentOption
> & { series?: Array<SeriesOption> };

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
