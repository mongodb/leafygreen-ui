import React, { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

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

export type ChartProps = React.ComponentPropsWithoutRef<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    /**
     * Unique identifier when using with `DragProvider`.
     */
    dragId?: string | number;

    /**
     * Enables tooltip synchronization across charts with the same groupId.
     * groupId must be set for this to work.
     * @default true
     */
    enableGroupTooltipSync?: boolean;

    /**
     * Charts with same groupID will have their tooltips synchronized.
     */
    groupId?: string;

    /**
     * Callback to be called when chart is finished rendering.
     */
    onChartReady?: () => void;

    /**
     * Zoom selection enablement configuration.
     */
    onZoomSelect?: (e: ZoomSelectionEvent) => void;

    /**
     * Controls the current chart state.
     */
    state?: ChartStates;

    /**
     * Zoom selection configuration.
     */
    zoomSelect?: ZoomSelect;
  }>;
