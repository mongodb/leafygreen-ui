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
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echart.ready]);

  useEffect(() => {
    if (echart.ready) {
      if (groupId) {
        echart.addToGroup(groupId);
      }

      return () => {
        echart.removeFromGroup();
      };
    }
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echart.ready, groupId]);

  useEffect(() => {
    if (echart.ready) {
      echart.setupZoomSelect({
        xAxis: zoomSelect?.xAxis,
        yAxis: zoomSelect?.yAxis,
      });
    }
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echart.ready, zoomSelect]);

  useEffect(() => {
    if (echart.ready && onZoomSelect) {
      echart.on(EChartEvents.ZoomSelect, zoomEventResponse => {
        onZoomSelect(zoomEventResponse);
      });
    }
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echart.ready, onZoomSelect]);

  function hideTooltip() {
    echart.hideTooltip();
  }

  // We want to hide the tooltip when it's hovered over any `EventMarkerPoint`
  useEffect(() => {
    if (echart.ready) {
      echart.on('mouseover', e => {
        if (e.componentType === 'markPoint') {
          hideTooltip();
          echart.on('mousemove', hideTooltip);
        }
      });

      // Stop hiding once the mouse leaves the `EventMarkerPoint`
      echart.on('mouseout', e => {
        if (e.componentType === 'markPoint') {
          echart.off('mousemove', hideTooltip);
        }
      });
    }
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echart.ready]);

  return {
    ...echart,
    ref: chartRef,
  };
}
