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
import type { ComposeOption, EChartsType } from 'echarts/core';

import { Theme } from '@leafygreen-ui/lib';

// Type not exported by echarts.
// reference: https://github.com/apache/echarts/blob/master/src/coord/axisCommonTypes.ts#L193
export type AxisLabelValueFormatter = (value: number, index?: number) => string;

type RequiredSeriesProps = 'type' | 'name' | 'data';
export type EChartSeriesOption = Pick<LineSeriesOption, RequiredSeriesProps> &
  Partial<Omit<LineSeriesOption, RequiredSeriesProps>>;

/**
 * TODO: This might need to be improved. `ComposeOption` appears to make most base option
 * keys "Arrayable". This is making it difficult to properly test partial options on
 * methods like updateUtils > updateOptions(), since something like `options.grid` could be
 * an array even if an object.
 */
export type EChartOptions = ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | TitleComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | XAXisComponentOption
  | YAXisComponentOption
> & { series?: Array<EChartSeriesOption> };

export const EChartEvents = {
  // Mouse Events
  Click: 'click',
  DblClick: 'dblclick',
  MouseDown: 'mousedown',
  MouseUp: 'mouseup',
  MouseOver: 'mouseover',
  MouseOut: 'mouseout',
  MouseMove: 'mousemove',
  GlobalOut: 'globalout',
  ContextMenu: 'contextmenu',
  // Drag Events
  DragStart: 'dragstart',
  Drag: 'drag',
  DragEnd: 'dragend',
  // Brush Events
  BrushSelected: 'brushselected',
  BrushEnd: 'brushEnd',
  Brush: 'brush',
  // Legend Events
  LegendSelectChanged: 'legendselectchanged',
  LegendSelected: 'legendselected',
  LegendUnselected: 'legendunselected',
  LegendSelectAll: 'legendselectall',
  LegendInverseSelect: 'legendinverseselect',
  LegendScroll: 'legendscroll',
  // Datzoom Events
  DataZoom: 'datazoom',
  DataRangeSelected: 'datarangeselected',
  TimelineChanged: 'timelinechanged',
  TimelinePlayChanged: 'timelineplaychanged',
  Restore: 'restore',
  // Map Events
  GeoRoam: 'georoam',
  GeoSelected: 'geoselected',
  GeoUnselected: 'geounselected',
  // Axis Events
  AxisAreaSelected: 'axisareaselected',
  FocusNodeAdjacency: 'focusnodeadjacency',
  UnfocusNodeAdjacency: 'unfocusnodeadjacency',
  // Rendering Events
  Rendered: 'rendered',
  Finished: 'finished',
  // Chart Action Events
  MagicTypeChanged: 'magictypechanged',
  TooltipShown: 'tooltipshown',
  TooltipHidden: 'tooltiphidden',
  SelectChanged: 'selectchanged',
  GlobalCursorTaken: 'globalcursortaken',
  // Custom
  ZoomSelect: 'zoomselect',
} as const;

export type EChartEventsType = (typeof EChartEvents)[keyof typeof EChartEvents];

export interface EChartZoomSelectionEvent {
  xAxis?: { startValue: number; endValue: number };
  yAxis?: { startValue: number; endValue: number };
}

export interface EChartSetupZoomSelectProps {
  xAxis?: boolean;
  yAxis?: boolean;
}

interface EChartsEventHandlerType {
  (
    event: EChartEventsType,
    callback: (params: any) => void,
    options?: Partial<{ useCanvasAsTrigger: boolean }>,
  ): void;
  (
    event: 'zoomselect',
    callback: (params: EChartZoomSelectionEvent) => void,
    options?: Partial<{ useCanvasAsTrigger: boolean }>,
  ): void;
}

export interface EChartsInstance {
  _getEChartsInstance: () => EChartsType | null;
  _getOptions: () => Partial<EChartOptions>;
  addSeries: (series: EChartSeriesOption) => void;
  addToGroup: (groupId: string) => void;
  enableZoom: () => void;
  error: Error | null;
  hideTooltip: () => void;
  off: EChartsEventHandlerType;
  on: EChartsEventHandlerType;
  ready: boolean;
  removeFromGroup: () => void;
  removeSeries: (name: string) => void;
  resize: () => void;
  setupZoomSelect: (props: EChartSetupZoomSelectProps) => void;
  showTooltip: (x: number, y: number) => void;
  updateOptions: (options: Omit<Partial<EChartOptions>, 'series'>) => void;
}

export interface EChartHookProps {
  container: HTMLDivElement | null;
  initialOptions?: Partial<EChartOptions>;
  shouldEnableZoom?: boolean;
  theme: Theme;
}
