import { useCallback, useEffect, useState } from 'react';

import { EChartEvents, EChartsInstance } from '../../Echart';
import { TOOLTIP_CLOSE_BTN_ID } from '../constants';

import { UseTooltipVisibilityReturnObj } from './useTooltipVisibility.types';

/**
 * Hook to manage the visibility of the tooltip in the chart including pinning behavior.
 */
export const useTooltipVisibility = ({
  echart,
}: {
  echart: EChartsInstance;
}): UseTooltipVisibilityReturnObj => {
  const [tooltipMounted, setTooltipMounted] = useState(false);
  const [tooltipPinned, setTooltipPinned] = useState(false);

  const { hideTooltip, off, on, ready, showTooltip } = echart;

  /**
   * Event listener callback added to the chart that is called on mouse move
   * to show the tooltip.
   */
  const showTooltipOnMouseMove = useCallback(
    (params: any) => {
      if (!tooltipMounted || tooltipPinned) {
        return;
      }

      const x = params.offsetX;
      const y = params.offsetY;
      showTooltip(x, y);
    },
    [showTooltip, tooltipMounted, tooltipPinned],
  );

  /**
   * Event listener callback added to the close button in the tooltip. When called,
   * it hides the tooltip and sets the `tooltipPinned` state to false.
   */
  const unpinTooltip = useCallback(() => {
    hideTooltip();
    setTooltipPinned(false);
  }, [hideTooltip]);

  /**
   * Helper method to add the `unpinTooltip` event listener to the close button
   * in the tooltip. The echarts tooltip `formatter` cannot pass the `onClick`
   * event to the button, so we have to add it manually.
   */
  const addUnpinCallbackToCloseButton = useCallback(() => {
    const btn = document.getElementById(TOOLTIP_CLOSE_BTN_ID);

    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', unpinTooltip);
      btn.dataset.bound = 'true'; // prevents duplicate listeners
    }
  }, [unpinTooltip]);

  /**
   * Event listener callback added to the chart that is called on click
   * to show/pin the tooltip and set the `tooltipPinned` state to true.
   */
  const pinTooltipOnClick = useCallback(
    (params: any) => {
      if (!tooltipMounted || tooltipPinned) {
        return;
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

      const x = params.offsetX;
      const y = params.offsetY;

      /**
       * We need to use requestAnimationFrame to ensure that the tooltip is shown
       * after the click event has been processed. Otherwise, the tooltip will
       * unmount/remount, and the tooltip will not be shown.
       */
      requestAnimationFrame(() => {
        showTooltip(x, y);
        addUnpinCallbackToCloseButton();
      });
      setTooltipPinned(true);
    },
    [
      addUnpinCallbackToCloseButton,
      showTooltipOnMouseMove,
      off,
      showTooltip,
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
    setTooltipMounted,
    tooltipPinned,
  };
};
