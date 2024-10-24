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

import { DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';

type RequiredSeriesProps = 'type' | 'name' | 'data';
export type SeriesOption = Pick<LineSeriesOption, RequiredSeriesProps> &
  Partial<Omit<LineSeriesOption, RequiredSeriesProps>>;

/**
 * TODO: This might need to be improved. `ComposeOption` appears to make most base option
 * keys "Arrayable". This is making it difficult to properly test partial options on
 * methods like updateUtils > updateOptions(), since something like `options.grid` could be
 * an array even if an object.
 */
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
  addChartSeries: 'addChartSeries',
  removeChartSeries: 'removeChartSeries',
  updateOptions: 'updateOptions',
} as const;

interface AddSeriesAction {
  type: typeof ChartActionType.addChartSeries;
  data: SeriesOption;
}

interface RemoveSeriesAction {
  type: typeof ChartActionType.removeChartSeries;
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
