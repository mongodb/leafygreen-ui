import { RefCallback } from 'react';

import { Theme } from '@leafygreen-ui/lib';

import type { EChartsInstance, EChartZoomSelectionEvent } from '../../Echart';
import { ChartStates } from '../Chart.types';

import { UseTooltipVisibilityReturnObj } from './useTooltipVisibility.types';

export type ZoomSelect =
  | {
      xAxis: boolean;
      yAxis?: boolean;
    }
  | {
      xAxis?: boolean;
      yAxis: boolean;
    }
  | undefined;

export interface ChartHookProps {
  /**
   * The id of the chart.
   */
  chartId?: string;

  /**
   * Enables tooltip synchronization across charts with the same `groupId`.
   * `groupId` must be set for this to work.
   */
  enableGroupTooltipSync: boolean;

  /**
   * Charts with the same `groupId` will have their tooltips synced across charts.
   */
  groupId?: string;

  /**
   * Callback to be called when chart is finished rendering.
   */
  onChartReady?: () => void;

  /**
   * Callback to be called when a zoom selection is made.
   */
  onZoomSelect?: (e: EChartZoomSelectionEvent) => void;

  /**
   * Controls the current chart state.
   */
  state?: ChartStates;

  theme: Theme;

  /**
   * Zoom selection enablement configuration.
   */
  zoomSelect?: ZoomSelect;
}

export interface ChartInstance
  extends EChartsInstance,
    Pick<ChartHookProps, 'enableGroupTooltipSync' | 'state'>,
    Pick<
      UseTooltipVisibilityReturnObj,
      'isChartHovered' | 'setTooltipMounted' | 'tooltipPinned'
    > {
  id: string;
  ref: RefCallback<HTMLDivElement>;
}
