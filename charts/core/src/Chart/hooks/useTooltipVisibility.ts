import { useCallback, useEffect, useState } from 'react';

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
  // if groupId is not provided, this state does not need to be managed
  const [isChartHovered, setIsChartHovered] = useState(!groupId);
  const [tooltipMounted, setTooltipMounted] = useState(false);
  const [tooltipPinned, setTooltipPinned] = useState(false);

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
      if (!tooltipMounted || tooltipPinned) {
        return;
      }

      const { offsetX, offsetY } = params;
      showTooltip(offsetX, offsetY);
    },
    [showTooltip, tooltipMounted, tooltipPinned],
  );

  /**
   * Event listener callback added to the close button in the tooltip. When called,
   * it hides the tooltip and sets the `tooltipPinned` state to false.
   */
  const unpinTooltip = useCallback(() => {
    setTooltipPinned(false);

    /**
     * Use requestAnimationFrame to ensure that the chart is added back to the
     * group and the tooltip is hidden after the `tooltipPinned` state updates.
     */
    requestAnimationFrame(() => {
      if (groupId) {
        addToGroup(groupId);
      }

      hideTooltip();
    });
  }, [addToGroup, groupId, hideTooltip]);

  /**
   * Helper method to add event listener to the close button in the tooltip.
   * The echarts tooltip `formatter` cannot pass the `onClick` event to the
   * button, so it has to be added manually.
   */
  const addUnpinCallbackToCloseButton = useCallback(() => {
    const btn = document.querySelector(`[data-chart-id="${chartId}"]`);

    if (btn instanceof HTMLElement && !btn.dataset.bound) {
      btn.addEventListener('click', unpinTooltip);
      btn.dataset.bound = 'true'; // prevents duplicate listeners
    }
  }, [chartId, unpinTooltip]);

  /**
   * Event listener callback added to the chart that is called on click
   * to show/pin the tooltip and set the `tooltipPinned` state to true.
   */
  const pinTooltipOnClick = useCallback(
    (params: any) => {
      if (!tooltipMounted || tooltipPinned) {
        return;
      }

      if (groupId) {
        removeFromGroup();
      }

      /**
       * Remove the mouse move and click event listeners to prevent the tooltip
       * from moving when it is pinned. User can unpin it by clicking the close
       * button in the tooltip which will turn the listeners back on.
       */
      off(EChartEvents.MouseMove, showTooltipOnMouseMove, {
        useCanvasAsTrigger: true,
      });
      off(EChartEvents.Click, pinTooltipOnClick, { useCanvasAsTrigger: true });

      setTooltipPinned(true);

      const { offsetX, offsetY } = params;

      /**
       * We need to use requestAnimationFrame to ensure that the tooltip is shown
       * after the click event has been processed. Otherwise, the tooltip will
       * unmount/remount, and the tooltip will not be shown.
       */
      requestAnimationFrame(() => {
        showTooltip(offsetX, offsetY);
        addUnpinCallbackToCloseButton();
      });
    },
    [
      addUnpinCallbackToCloseButton,
      groupId,
      removeFromGroup,
      off,
      showTooltip,
      showTooltipOnMouseMove,
      tooltipMounted,
      tooltipPinned,
    ],
  );

  /**
   * Event listener callback that is called when mousing over a mark point.
   * It hides the tooltip and disables the chart click event listener.
   */
  const hideTooltipOnMouseOverMark = useCallback(
    (params: any) => {
      if (!tooltipMounted) {
        return;
      }

      if (
        params.componentType === 'markPoint' ||
        params.componentType === 'markLine'
      ) {
        hideTooltip();
        on(EChartEvents.MouseMove, hideTooltip);
        off(EChartEvents.Click, pinTooltipOnClick, {
          useCanvasAsTrigger: true,
        });
      }
    },
    [hideTooltip, off, on, pinTooltipOnClick, tooltipMounted],
  );

  /**
   * Event listener callback that is called when mousing out of a mark point.
   * It stops hiding the tooltip and re-enables the chart click event listener.
   */
  const stopHideTooltipOnMouseOutMark = useCallback(
    (params: any) => {
      if (!tooltipMounted) {
        return;
      }

      if (
        params.componentType === 'markPoint' ||
        params.componentType === 'markLine'
      ) {
        off(EChartEvents.MouseMove, hideTooltip);
        on(EChartEvents.Click, pinTooltipOnClick, {
          useCanvasAsTrigger: true,
        });
      }
    },
    [hideTooltip, off, on, pinTooltipOnClick, tooltipMounted],
  );

  /**
   * Effect to add event listeners to the chart container to toggle the `isChartHovered`
   * state on mouse enter and leave when the chart is grouped.
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
    if (!ready) {
      return;
    }

    if (tooltipPinned) {
      return;
    }

    on(EChartEvents.MouseMove, showTooltipOnMouseMove, {
      useCanvasAsTrigger: true,
    });
    on(EChartEvents.Click, pinTooltipOnClick, {
      useCanvasAsTrigger: true,
    });
  }, [on, pinTooltipOnClick, ready, showTooltipOnMouseMove, tooltipPinned]);

  /**
   * Effect to add the event listeners to hide the tooltip when hovering a mark point.
   */
  useEffect(() => {
    if (!ready) {
      return;
    }

    on(EChartEvents.MouseOver, hideTooltipOnMouseOverMark);
    on(EChartEvents.MouseOut, stopHideTooltipOnMouseOutMark);
  }, [
    pinTooltipOnClick,
    showTooltipOnMouseMove,
    hideTooltipOnMouseOverMark,
    stopHideTooltipOnMouseOutMark,
    hideTooltip,
    off,
    on,
    ready,
    tooltipPinned,
  ]);

  return {
    isChartHovered,
    setTooltipMounted,
    tooltipPinned,
  };
};
