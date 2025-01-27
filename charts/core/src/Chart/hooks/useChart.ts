import { RefCallback, useCallback, useEffect, useRef, useState } from 'react';

import { useEchart } from '../../Echart';
import { EChartEvents } from '../../Echart';
import { getDefaultChartOptions } from '../config';

import type { ChartHookProps, ChartInstance } from './useChart.types';

// TODO(LG-4803): Fix linting issues
/* eslint-disable react-hooks/exhaustive-deps */

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

      return () => {
        echart.removeFromGroup();
      };
    }
  }, [echart.ready, groupId]);

  // SETUP AND ENABLE ZOOM
  useEffect(() => {
    if (echart.ready) {
      echart.setupZoomSelect({
        xAxis: zoomSelect?.xAxis,
        yAxis: zoomSelect?.yAxis,
      });

      if (zoomSelect?.xAxis || zoomSelect?.yAxis) {
        function enableZoomOnRender() {
          echart.enableZoom();
          /**
           * Enabling zoom triggers a render, so once we enable it, we want to
           * remove the handler or else there will be an infinite loop of
           * render -> enable -> render -> etc.
           */
          echart?.off('rendered', enableZoomOnRender);
        }

        echart?.on('rendered', enableZoomOnRender);
      }
    }
  }, [echart.ready, zoomSelect]);

  useEffect(() => {
    if (echart.ready && onZoomSelect) {
      echart.on(EChartEvents.ZoomSelect, zoomEventResponse => {
        onZoomSelect(zoomEventResponse);
      });
    }
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
  }, [echart, echart.ready]);

  const initialRenderRef = useRef(true);

  const handleResize = useCallback(() => {
    if (echart.ready) {
      // Skip the first resize event, as it's triggered by the initial render
      if (initialRenderRef.current) {
        initialRenderRef.current = false;
        return;
      }

      echart.resize();

      /**
       * If the chart has been resized, the chart appears to reset zoom, which
       * disables it. We need to re-enable it after the resize however, doing so
       * immediately doesn't work. Tying into the 'rendered' and 'finished'
       * events was attempted but doesn't work either. Manually waiting a bit
       * does work however... I know, I know... I hate it too.
       */
      if (zoomSelect?.xAxis || zoomSelect?.yAxis) {
        setTimeout(() => {
          echart.enableZoom();
        }, 100);
      }
    }
  }, [echart.ready, initialRenderRef]);

  useEffect(() => {
    if (echart.ready && container) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [echart.ready, container, handleResize]);

  return {
    ...echart,
    ref: chartRef,
  };
}
