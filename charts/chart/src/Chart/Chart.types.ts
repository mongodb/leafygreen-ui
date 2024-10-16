import { type DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';
import type { XAXisComponentOption, YAXisComponentOption } from 'echarts';
import type { LineSeriesOption } from 'echarts/charts';
import type {
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  TitleComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

// export type SeriesOption = LineSeriesOption;

export type ChartOptions = ComposeOption<
  | LineSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | TitleComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | XAXisComponentOption
  | YAXisComponentOption
>;

// export type ChartOptions = EChartsOption;

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
  data: ChartOptions['series'];
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
