import { RefCallback, useCallback, useEffect, useState } from 'react';

import { useEchart } from '../../Echart';
import { EChartEvents } from '../../Echart';
import { getDefaultChartOptions } from '../config';

import type { ChartHookProps, ChartInstance } from './useChart.types';

export function useChart({
  onChartReady = () => {},
  zoomSelect,
  onZoomSelect,
  groupId,
  theme,
}: ChartHookProps): ChartInstance {
  const initialOptions = getDefaultChartOptions(theme);

  /**
   * It is necessary for `useEchart` to know when the container exists
   * in order to instantiate the chart. Since this happens only on first render,
   * we use a container element stored in state and a ref callback so that the
   * element only gets populated after render.
   */
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const chartRef: RefCallback<HTMLDivElement> = useCallback(node => {
    setContainer(node);
  }, []);
  const echart = useEchart({
    container,
    initialOptions,
    theme,
  });

  useEffect(() => {
    if (echart.ready) {
      onChartReady();
    }
  }, [echart.ready]);

  useEffect(() => {
    if (echart.ready) {
      if (groupId) {
        echart.addToGroup(groupId);
      }
    }
  }, [echart.ready, groupId]);

  useEffect(() => {
    if (echart.ready) {
      echart.setupZoomSelect({
        xAxis: zoomSelect?.xAxis,
        yAxis: zoomSelect?.yAxis,
      });
    }
  }, [echart.ready, zoomSelect]);

  useEffect(() => {
    if (echart.ready && onZoomSelect) {
      echart.on(EChartEvents.ZoomSelect, zoomEventResponse => {
        onZoomSelect(zoomEventResponse);
      });
    }
  }, [echart.ready, onZoomSelect]);

  return {
    ...echart,
    ref: chartRef,
  };
}
