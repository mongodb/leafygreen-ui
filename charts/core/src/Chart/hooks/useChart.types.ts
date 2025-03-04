import { RefCallback } from 'react';

import { Theme } from '@leafygreen-ui/lib';

import type { EChartsInstance, EChartZoomSelectionEvent } from '../../Echart';

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
}

export interface ChartInstance extends EChartsInstance {
  ref: RefCallback<HTMLDivElement>;
}
