import { PropsWithChildren } from 'react';
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

import { ZoomSelectionEvent } from './hooks/useChart.types';

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

export interface ChartProps
  extends HTMLElementProps<'div'>,
    DarkModeProps,
    PropsWithChildren {
  /**
   * Callback to be called when chart is finished rendering.
   */
  onChartReady?: () => void;

  /**
   * Callback to be called when a user clicks and drags on a chart to zoom.
   * Click and drag action will only be enabled if this handler is present.
   */
  onZoomSelect?: (e: ZoomSelectionEvent) => void;
}

export const ChartActionType = {
  addChartSeries: 'addChartSeries',
  removeChartSeries: 'removeChartSeries',
  updateOptions: 'updateOptions',
} as const;
