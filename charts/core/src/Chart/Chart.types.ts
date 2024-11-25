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

import { ZoomEvent } from './hooks/useChart.types';

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
  onZoom?: (e: ZoomEvent) => void;
}

export const ChartActionType = {
  addChartSeries: 'addChartSeries',
  removeChartSeries: 'removeChartSeries',
  updateOptions: 'updateOptions',
} as const;
