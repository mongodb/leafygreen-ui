import type { ChartOptions, SeriesOption } from '../Chart';

type EChartsEvents =
  // Mouse Events
  | 'click' // Triggered when clicking on a series, data item, or other graphical element
  | 'dblclick' // Triggered when double clicking
  | 'mousedown' // Triggered when pressing down the mouse button
  | 'mouseup' // Triggered when releasing the mouse button
  | 'mouseover' // Triggered when mouse hovers over a component
  | 'mouseout' // Triggered when mouse leaves a component
  | 'mousemove' // Triggered when mouse moves within a component
  | 'globalout' // Triggered when mouse leaves the chart area
  | 'contextmenu' // Triggered when right clicking

  // Drag Events
  | 'dragstart' // Triggered when starting to drag a component
  | 'drag' // Triggered while dragging
  | 'dragend' // Triggered when ending a drag operation

  // Brush Events
  | 'brushselected' // Triggered when selecting an area using the brush tool
  | 'brushEnd' // Triggered when brush selection ends
  | 'brush' // Triggered during brush selection

  // Legend Events
  | 'legendselectchanged' // Triggered when legend selection changes
  | 'legendselected' // Triggered when clicking legend item
  | 'legendunselected' // Triggered when unselecting legend item
  | 'legendselectall' // Triggered when selecting all legend items
  | 'legendinverseselect' // Triggered when inversely selecting legend items
  | 'legendscroll' // Triggered when scrolling legend

  // Dataoom Events
  | 'datazoom' // Triggered when data zoom area changes
  | 'datarangeselected' // Triggered when selecting a range in continuous visual map
  | 'timelinechanged' // Triggered when timeline changes
  | 'timelineplaychanged' // Triggered when timeline play state changes
  | 'restore' // Triggered when restoring chart to initial state

  // Map Events
  | 'georoam' // Triggered when roaming (zooming/panning) in geo coordinate system
  | 'geoselected' // Triggered when selecting areas in geo coordinate system
  | 'geounselected' // Triggered when unselecting areas in geo coordinate system

  // Axis Events
  | 'axisareaselected' // Triggered when selecting an axis area
  | 'focusnodeadjacency' // Triggered when focusing on adjacent nodes (graph)
  | 'unfocusnodeadjacency' // Triggered when unfocusing adjacent nodes (graph)

  // Rendering Events
  | 'rendered' // Triggered after chart rendering finished
  | 'finished' // Triggered after chart animation finished

  // Chart Action Events
  | 'magictypechanged' // Triggered when changing chart type using magic type switcher
  | 'tooltipshown' // Triggered when tooltip is shown
  | 'tooltiphidden' // Triggered when tooltip is hidden
  | 'selectchanged' // Triggered when selection state changes
  | 'globalcursortaken'; // Triggered when global cursor is taken

export interface ZoomSelectionEvent {
  xAxis?: { startValue: number; endValue: number };
  yAxis?: { startValue: number; endValue: number };
}

export interface setupZoomSelectProps {
  xAxis?: boolean;
  yAxis?: boolean;
}

type EChartsEventHandlerType = {
  // Regular events use the original param type
  (event: EChartsEvents, callback: (params: any) => void): void;
  // Specific override for 'zoomselect'
  (event: 'zoomselect', callback: (params: ZoomSelectionEvent) => void): void;
};

export interface EChartsInstance {
  _echartsInstance: any;
  ready: boolean;
  options: Partial<ChartOptions>;
  updateOptions: (options: Omit<Partial<ChartOptions>, 'series'>) => void;
  on: EChartsEventHandlerType;
  off: EChartsEventHandlerType;
  addSeries: (series: SeriesOption) => void;
  removeSeries: (name: string) => void;
  addToGroup: (groupId: string) => void;
  removeFromGroup: () => void;
  setupZoomSelect: (setupZoomSelectProps: setupZoomSelectProps) => void;
  error: Error | null;
}

export interface EChartHookProps {
  container: HTMLDivElement | null;
  initialOptions?: Partial<ChartOptions>;
}
