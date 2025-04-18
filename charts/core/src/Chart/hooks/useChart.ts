import { useCallback, useEffect, useRef, useState } from 'react';

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
  state,
}: ChartHookProps): ChartInstance {
  const initialOptions = getDefaultChartOptions(theme);

  /**
   * It is necessary for `useEchart` to know when the container exists
   * in order to instantiate the chart. Since this happens only on first render,
   * we use a container element stored in state and a ref callback so that the
   * element only gets populated after render.
   */
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const echart = useEchart({
    container,
    initialOptions,
    theme,
  });

  const {
    addToGroup,
    enableZoom,
    hideTooltip,
    off,
    on,
    ready,
    removeFromGroup,
    resize,
    setupZoomSelect,
  } = echart;

  useEffect(() => {
    if (ready) {
      onChartReady();
    }
  }, [ready, onChartReady]);

  useEffect(() => {
    if (ready) {
      if (groupId) {
        addToGroup(groupId);
      }

      return () => {
        removeFromGroup();
      };
    }
  }, [ready, groupId, addToGroup, removeFromGroup]);

  // SETUP AND ENABLE ZOOM
  useEffect(() => {
    if (ready) {
      setupZoomSelect({
        xAxis: zoomSelect?.xAxis,
        yAxis: zoomSelect?.yAxis,
      });

      if (zoomSelect?.xAxis || zoomSelect?.yAxis) {
        function enableZoomOnRender() {
          enableZoom();
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
  }, [echart, enableZoom, ready, setupZoomSelect, zoomSelect]);

  useEffect(() => {
    if (ready && onZoomSelect) {
      on(EChartEvents.ZoomSelect, zoomEventResponse => {
        onZoomSelect(zoomEventResponse);
      });
    }
  }, [ready, onZoomSelect, on]);

  // We want to hide the tooltip when it's hovered over any `EventMarkerPoint`
  useEffect(() => {
    if (ready) {
      on('mouseover', e => {
        if (e.componentType === 'markPoint') {
          hideTooltip();
          on('mousemove', hideTooltip);
        }
      });

      // Stop hiding once the mouse leaves the `EventMarkerPoint`
      on('mouseout', e => {
        if (e.componentType === 'markPoint') {
          off('mousemove', hideTooltip);
        }
      });
    }
  }, [echart, hideTooltip, off, on, ready]);

  const initialRenderRef = useRef(true);

  const handleResize = useCallback(() => {
    if (ready) {
      // Skip the first resize event, as it's triggered by the initial render
      if (initialRenderRef.current) {
        initialRenderRef.current = false;
        return;
      }

      if (zoomSelect && (zoomSelect.xAxis || zoomSelect.yAxis)) {
        /**
         * If the chart has been resized, the chart appears to reset zoom, which
         * disables it. We need to re-enable it after the resize however, doing so
         * immediately doesn't work. To work around this, we listen for the `finished`
         * event, which is triggered after the chart has been rendered, and then
         * execute the re-enable zoom logic after all tasks on the queue have been
         * processed.
         *
         * TODO(LG-4818): Investigate why this is necessary
         */
        function reEnableZoom() {
          function reEnableZoomCallback() {
            enableZoom();
            off('finished', reEnableZoom);
          }
          setTimeout(reEnableZoomCallback, 0);
        }

        on('finished', reEnableZoom);
      }

      resize();
    }
  }, [enableZoom, off, on, ready, resize, zoomSelect]);

  useEffect(() => {
    if (ready && container) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ready, container, handleResize]);

  return {
    ...echart,
    ref: setContainer,
    state,
  };
}
