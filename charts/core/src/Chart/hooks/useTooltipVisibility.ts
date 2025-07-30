import { useCallback, useEffect, useRef, useState } from 'react';

import { CHART_TOOLTIP_CLASSNAME } from '../../constants';
import { EChartEvents, EChartsInstance } from '../../Echart';

import { UseTooltipVisibilityReturnObj } from './useTooltipVisibility.types';

/**
 * Hook to manage the visibility of the tooltip in the chart including pinning behavior.
 */
export const useTooltipVisibility = ({
  chartId,
  container,
  echart,
  groupId,
}: {
  chartId: string;
  container: HTMLDivElement | null;
  echart: EChartsInstance;
  groupId?: string;
}): UseTooltipVisibilityReturnObj => {
  // if groupId is not provided, this state will always be true
  const [isChartHovered, setIsChartHovered] = useState(!groupId);
  const [pinnedPosition, setPinnedPosition] = useState([0, 0]);
  const [tooltipMounted, setTooltipMounted] = useState(false);
  const [tooltipPinned, setTooltipPinned] = useState(false);

  const tooltipMountedRef = useRef(tooltipMounted);
  const tooltipPinnedRef = useRef(tooltipPinned);

  const {
    addToGroup,
    hideTooltip,
    off,
    on,
    ready,
    removeFromGroup,
    showTooltip,
  } = echart;

  /**
   * Event listener callback added to the chart that is called on `mouseenter`
   * or `mouseleave` to set the `isChartHovered` state.
   */
  const toggleChartHover = useCallback((isMouseEnter: boolean) => {
    setIsChartHovered(isMouseEnter);
  }, []);

  /**
   * Event listener callback added to the chart that is called on mouse move
   * to show the tooltip.
   */
  const showTooltipOnMouseMove = useCallback(
    (params: any) => {
      if (!tooltipMountedRef.current || tooltipPinnedRef.current) {
        return;
      }

      const { offsetX, offsetY } = params;
      showTooltip(offsetX, offsetY);
    },
    [showTooltip],
  );

  /**
   * Callback to remove the chart from the group if it is grouped, record the `pinnedPosition`
   * state, and set the `tooltipPinned` state to true.
   *
   * Separate effect is used to show tooltip and add the unpin event listener because
   * the `ChartTooltip` instance must first react to the `tooltipPinned` state change.
   */
  const pinTooltip = useCallback(
    (params: any) => {
      /**
       * When the tooltip is pinned, the chart is removed from the group to prevent
       * event listeners of sibling charts from triggering the tooltip of current chart.
       */
      if (groupId) {
        removeFromGroup();
      }

      /**
       * Remove the mouse move event listener to prevent the tooltip from moving when it
       * is pinned. User can unpin it by clicking the close button in the tooltip which
       * will turn the listener back on.
       */
      off(EChartEvents.MouseMove, showTooltipOnMouseMove, {
        useCanvasAsTrigger: true,
      });

      const { offsetX, offsetY } = params;
      setPinnedPosition([offsetX, offsetY]);
      setTooltipPinned(true);
    },
    [groupId, off, removeFromGroup, showTooltipOnMouseMove],
  );

  /**
   * Callback to set the `tooltipPinned` state to false and add the chart back to the group.
   * It also hides the tooltip after the state change has been applied.
   */
  const unpinTooltip = useCallback(() => {
    /**
     * When the tooltip is pinned, the chart is removed from the group to prevent
     * event listeners of sibling charts from triggering the tooltip of current chart.
     *
     * When unpinning the tooltip, the chart is added back to the group.
     */
    if (groupId) {
      addToGroup(groupId);
    }

    setTooltipPinned(false);

    /**
     * Use requestAnimationFrame to ensure that the tooltip is hidden after
     * `ChartTooltip` has reacted to the `tooltipPinned` state change.
     */
    requestAnimationFrame(() => {
      hideTooltip();
    });
  }, [addToGroup, groupId, hideTooltip]);

  /**
   * Helper method to add event listener to the close button in the tooltip.
   *
   * The echarts tooltip `formatter` cannot pass the `onClick` event to the button,
   * so it has to be added manually.
   */
  const addUnpinCallbackToCloseButton = useCallback(() => {
    const btn = document.querySelector(`button[data-chartid="${chartId}"]`);

    if (btn instanceof HTMLElement && !btn.dataset.bound) {
      btn.addEventListener('click', unpinTooltip);
      btn.dataset.bound = 'true'; // prevents duplicate listeners
    }
  }, [chartId, unpinTooltip]);

  /**
   * Event listener callback added to the chart. When called, it toggles the
   * tooltip pinning.
   */
  const toggleTooltipPinning = useCallback(
    (params: any) => {
      if (!tooltipMountedRef.current) {
        return;
      }

      if (tooltipPinnedRef.current) {
        unpinTooltip();
        return;
      } else {
        pinTooltip(params);
        return;
      }
    },
    [pinTooltip, unpinTooltip],
  );

  /**
   * Event listener callback that is called when mousing over a mark point or line.
   * It hides the tooltip and disables the chart click event listener.
   */
  const hideTooltipOnMouseOverMark = useCallback(
    (params: any) => {
      if (!tooltipMountedRef.current) {
        return;
      }

      if (
        params.componentType === 'markPoint' ||
        params.componentType === 'markLine'
      ) {
        hideTooltip();
        on(EChartEvents.MouseMove, hideTooltip);
        off(EChartEvents.Click, toggleTooltipPinning, {
          useCanvasAsTrigger: true,
        });
      }
    },
    [hideTooltip, off, on, toggleTooltipPinning],
  );

  /**
   * Event listener callback that is called when mousing out of a mark point or line.
   * It stops hiding the tooltip and re-enables the chart click event listener.
   */
  const stopHideTooltipOnMouseOutMark = useCallback(
    (params: any) => {
      if (!tooltipMountedRef.current) {
        return;
      }

      if (
        params.componentType === 'markPoint' ||
        params.componentType === 'markLine'
      ) {
        off(EChartEvents.MouseMove, hideTooltip);
        on(EChartEvents.Click, toggleTooltipPinning, {
          useCanvasAsTrigger: true,
        });
      }
    },
    [hideTooltip, off, on, toggleTooltipPinning],
  );

  useEffect(() => {
    tooltipMountedRef.current = tooltipMounted;
  }, [tooltipMounted]);

  useEffect(() => {
    tooltipPinnedRef.current = tooltipPinned;
  }, [tooltipPinned]);

  /**
   * Effect to add event listeners to the chart container to toggle the `isChartHovered`
   * state on mouse enter and leave when the chart is grouped.
   *
   * When charts are grouped, the mousemove events are synced across all charts to render
   * uniformly aligned axis pointers. `isChartHovered` state is used to determine if the
   * tooltip content should also be displayed or not.
   */
  useEffect(() => {
    if (!container || !groupId) {
      return;
    }

    container.addEventListener('mouseenter', () => toggleChartHover(true));
    container.addEventListener('mouseleave', () => toggleChartHover(false));

    return () => {
      container.removeEventListener('mouseenter', () => toggleChartHover(true));
      container.removeEventListener('mouseleave', () =>
        toggleChartHover(false),
      );
    };
  }, [container, groupId, toggleChartHover]);

  /**
   * Effect to turn on the tooltip event listeners when the chart is ready and tooltip
   * is not already pinned.
   */
  useEffect(() => {
    if (!ready || tooltipPinned) {
      return;
    }

    on(EChartEvents.MouseMove, showTooltipOnMouseMove, {
      useCanvasAsTrigger: true,
    });
    on(EChartEvents.Click, toggleTooltipPinning, {
      useCanvasAsTrigger: true,
    });
  }, [ready, tooltipPinned, on, showTooltipOnMouseMove, toggleTooltipPinning]);

  /**
   * Effect to add the event listeners to hide the tooltip when hovering a mark.
   */
  useEffect(() => {
    if (!ready) {
      return;
    }

    on(EChartEvents.MouseOver, hideTooltipOnMouseOverMark);
    on(EChartEvents.MouseOut, stopHideTooltipOnMouseOutMark);
  }, [ready, on, hideTooltipOnMouseOverMark, stopHideTooltipOnMouseOutMark]);

  /**
   * Effect to react to the `tooltipPinned` state and show the tooltip.
   *
   * `setTimeout` is used to defer execution of callbacks to show tooltip and add unpin
   * callback until the next tick of the event loop at which point the echarts tooltip
   * is rendered and in the DOM
   */
  useEffect(() => {
    if (!tooltipPinnedRef.current) {
      return;
    }

    const [x, y] = pinnedPosition;
    setTimeout(() => {
      showTooltip(x, y);
      addUnpinCallbackToCloseButton();
    });
  }, [pinnedPosition, showTooltip, addUnpinCallbackToCloseButton]);

  /**
   * Effect to clean up any tooltip elements when the component is unmounted.
   *
   * This is specifically required for cases where the echarts instance is cleaned up
   * before the `hideTooltip` action can be called on the instance.
   */
  useEffect(() => {
    return () => {
      const tooltipEls = document.getElementsByClassName(
        CHART_TOOLTIP_CLASSNAME,
      );
      Array.from(tooltipEls).forEach(el => el.remove());
    };
  }, []);

  return {
    isChartHovered,
    setTooltipMounted,
    tooltipPinned,
    unpinTooltip,
  };
};
