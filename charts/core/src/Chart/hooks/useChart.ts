import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';

import { useEchart } from '../../Echart';
import { EChartEvents } from '../../Echart';
import { getDefaultChartOptions } from '../config';

import type { ChartHookProps, ChartInstance } from './useChart.types';
import { useTooltipVisibility } from './useTooltipVisibility';

export function useChart({
  chartId,
  enableGroupTooltipSync,
  groupId,
  onChartReady = () => {},
  onZoomSelect,
  state,
  theme,
  zoomSelect,
}: ChartHookProps): ChartInstance {
  const initialOptions = useMemo(() => getDefaultChartOptions(theme), [theme]);

  /**
   * It is necessary for `useEchart` to know when the container exists
   * in order to instantiate the chart. Since this happens only on first render,
   * we use a container element stored in state and a ref callback so that the
   * element only gets populated after render.
   */
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const id = useIdAllocator({ id: chartId, prefix: 'lg-chart' });

  const echart = useEchart({
    container,
    initialOptions,
    shouldEnableZoom: zoomSelect?.xAxis || zoomSelect?.yAxis,
    theme,
  });

  const {
    addToGroup,
    enableZoom,
    off,
    on,
    ready,
    removeFromGroup,
    resize,
    setupZoomSelect,
  } = echart;

  useEffect(() => {
    if (!ready) {
      return;
    }
    onChartReady();
  }, [ready, onChartReady]);

  const { isChartHovered, setTooltipMounted, tooltipPinned, unpinTooltip } =
    useTooltipVisibility({
      chartId: id,
      container,
      echart,
      groupId,
    });

  useEffect(() => {
    if (!ready || !groupId || tooltipPinned) {
      return;
    }

    addToGroup(groupId);

    return () => {
      removeFromGroup();
    };
  }, [ready, groupId, addToGroup, removeFromGroup, tooltipPinned]);

  // SETUP AND ENABLE ZOOM
  useEffect(() => {
    if (!ready) {
      return;
    }

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
        off('rendered', enableZoomOnRender);
      }

      on('rendered', enableZoomOnRender);
    }
  }, [enableZoom, off, on, ready, setupZoomSelect, zoomSelect]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    on(EChartEvents.ZoomSelect, zoomEventResponse => {
      unpinTooltip();
      onZoomSelect?.(zoomEventResponse);
    });
  }, [ready, onZoomSelect, on, unpinTooltip]);

  const initialRenderRef = useRef(true);

  const handleResize = useCallback(() => {
    if (!ready) {
      return;
    }

    // Skip the first resize event, as it's triggered by the initial render
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }

    resize();
  }, [ready, resize]);

  useEffect(() => {
    if (!ready || !container) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [container, ready, handleResize]);

  return {
    ...echart,
    enableGroupTooltipSync: !!groupId && enableGroupTooltipSync,
    id,
    isChartHovered,
    ref: setContainer,
    setTooltipMounted,
    state,
    tooltipPinned,
  };
}
