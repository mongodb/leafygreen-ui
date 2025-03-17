import { PropsWithChildren } from 'react';

import { DarkModeProps, type HTMLElementProps } from '@leafygreen-ui/lib';

import {
  EChartOptions,
  EChartSeriesOption,
  EChartZoomSelectionEvent,
} from '../Echart';

import { ZoomSelect } from './hooks/useChart.types';

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
    zoomSelect?: ZoomSelect;

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
