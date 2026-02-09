import { RefCallback } from 'react';

import { Theme } from '@leafygreen-ui/lib';

import { ChartGroupContextType } from '../../ChartGroup/ChartGroupContext.types';
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

export interface ChartHookProps extends Partial<ChartGroupContextType> {
  /**
   * The id of the chart.
   */
  chartId?: string;

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
    Pick<ChartHookProps, 'enableTooltipSync' | 'isSomeChartHovered' | 'state'>,
    Pick<
      UseTooltipVisibilityReturnObj,
      'isChartHovered' | 'setTooltipMounted' | 'tooltipPinned'
    > {
  id: string;
  ref: RefCallback<HTMLDivElement>;
}
