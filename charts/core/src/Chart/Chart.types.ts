import { PropsWithChildren, RefCallback } from 'react';

import {
  DarkModeProps,
  type HTMLElementProps,
  Theme,
} from '@leafygreen-ui/lib';

import type {
  EChartOptions,
  EChartSeriesOption,
  EChartsInstance,
  EChartZoomSelectionEvent,
} from '../Echart';

export type SeriesOption = EChartSeriesOption;
export type ChartOptions = EChartOptions;
export type ZoomSelectionEvent = EChartZoomSelectionEvent;

export const ChartStates = {
  Unset: 'unset',
  Loading: 'loading',
  Dragging: 'dragging',
  Overlay: 'overlay',
} as const;
export type ChartStates = (typeof ChartStates)[keyof typeof ChartStates];

export type ChartZoomSelect =
  | {
      xAxis: boolean;
      yAxis?: boolean;
    }
  | {
      xAxis?: boolean;
      yAxis: boolean;
    }
  | undefined;

export type ChartProps = HTMLElementProps<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    /**
     * Callback to be called when chart is finished rendering.
     */
    onChartReady?: () => void;

    /**
     * Zoom selection configuration.
     */
    zoomSelect?: ChartZoomSelect;

    /**
     * Zoom selection enablement configuration.
     */
    onZoomSelect?: (e: ZoomSelectionEvent) => void;

    /**
     * Charts with same groupID will have their tooltips synchronized.
     */
    groupId?: string;

    /**
     * Controls the current chart state.
     */
    state?: ChartStates;

    /**
     * Unique identifier when using with `DragProvider`.
     */
    dragId?: string | number;
  }>;

export interface ChartHookProps {
  theme: Theme;

  /**
   * Charts with the same `groupId` will have their tooltips synced across charts.
   */
  groupId?: string;

  /**
   * Callback to be called when chart is finished rendering.
   */
  onChartReady?: () => void;

  /**
   * Zoom selection enablement configuration.
   */
  zoomSelect?: ChartZoomSelect;

  /**
   * Callback to be called when a zoom selection is made.
   */
  onZoomSelect?: (e: EChartZoomSelectionEvent) => void;

  /**
   * Controls the current chart state.
   */
  state?: ChartStates;
}

export interface ChartInstance
  extends EChartsInstance,
    Pick<ChartHookProps, 'state'> {
  ref: RefCallback<HTMLDivElement>;
}
