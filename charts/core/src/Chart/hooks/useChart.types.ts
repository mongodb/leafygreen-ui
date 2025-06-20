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
  theme: Theme;

  /**
   * The id of the chart.
   */
  chartId?: string;

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
  zoomSelect?: ZoomSelect;

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
    Pick<ChartHookProps, 'state'>,
    Pick<
      UseTooltipVisibilityReturnObj,
      'isChartHovered' | 'setTooltipMounted' | 'tooltipPinned'
    > {
  id: string;
  ref: RefCallback<HTMLDivElement>;
}
