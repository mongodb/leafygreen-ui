import { remove } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { EChartEvents, EChartsInstance } from '../../Echart';
import { TOOLTIP_CLOSE_BTN_ID } from '../constants';

import { UseTooltipVisibilityReturnObj } from './useTooltipVisibility.types';

/**
 * Hook to manage the visibility of the tooltip in the chart including pinning behavior.
 */
export const useTooltipVisibility = ({
  container,
  echart,
  groupId,
}: {
    container: HTMLDivElement | null;
  echart: EChartsInstance;
    groupId?: string;
}): UseTooltipVisibilityReturnObj => {
  const [foo, setFoo] = useState(false);
  const [tooltipMounted, setTooltipMounted] = useState(false);
  const [tooltipPinned, setTooltipPinned] = useState(false);
  const [tooltipPos, setTooltipPos] = useState([0, 0]);

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
   * Event listener callback added to the chart that is called on mouse move
   * to show the tooltip.
   */
  const showTooltipOnMouseMove = useCallback(
    (params: any) => {
      console.log('showTooltipOnMouseMove');
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
    console.log('unpinTooltip');
    setTooltipPinned(false);

    /**
     * We need to use requestAnimationFrame to ensure that the tooltip is hidden
     * after the `tooltipPinned` state updates.
     */
    requestAnimationFrame(() => {
      if (groupId) {
        addToGroup(groupId);
      }
      hideTooltip();
    });
  }, [addToGroup, groupId, hideTooltip]);

  /**
   * Helper method to add the `unpinTooltip` event listener to the close button
   * in the tooltip. The echarts tooltip `formatter` cannot pass the `onClick`
   * event to the button, so we have to add it manually.
   */
  const addUnpinCallbackToCloseButton = useCallback(() => {
    console.log('addUnpinCallbackToCloseButton');
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
      console.log('pinTooltipOnClick');
      if (!tooltipMounted || tooltipPinned) {
        return;
      }

      removeFromGroup();

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

      setTooltipPinned(true);
      setTooltipPos([x, y]);

      /**
       * We need to use requestAnimationFrame to ensure that the tooltip is shown
       * after the `tooltipPinned` state updates.
       */
      requestAnimationFrame(() => {
        showTooltip(x, y);
        addUnpinCallbackToCloseButton();
      });
    },
    [
      addUnpinCallbackToCloseButton,
      groupId,
      off,
      removeFromGroup,
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
      console.log('hideTooltipOnMouseOverMark');
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
      console.log('stopHideTooltipOnMouseOutMark');
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

  const handleFooOnMouseEnter = useCallback(() => {
    console.log('setting foo to true');
    setFoo(true);
  }, []);

  const handleFooOnMouseLeave = useCallback(() => {
    console.log('setting foo to false', { tooltipMounted, tooltipPinned, tooltipPos });
    setFoo(false);
    if (!tooltipPinned) {
      console.log('resetting axis pos')
      setTimeout(() => {
        showTooltip(300, 60);
      }, 0);
    }
  }, [setFoo, showTooltip, tooltipPinned, tooltipPos]);

  useEffect(() => {
    if (!container) {
      return;
    }

    container.addEventListener('mouseenter', handleFooOnMouseEnter);
    container.addEventListener('mouseleave', handleFooOnMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleFooOnMouseEnter);
      container.removeEventListener('mouseleave', handleFooOnMouseLeave);
    }
  }, [container]);

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
    foo,
    setTooltipMounted,
    tooltipPinned,
    tooltipPos,
  };
};
