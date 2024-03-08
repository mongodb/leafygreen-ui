import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';

import { spacing } from '@leafygreen-ui/tokens';

import { TOAST_CONSTANTS } from '../../constants';
import { ToastId, ToastStack } from '../../ToastContext';

interface UseToastHeightsProps {
  stack: ToastStack;
  getToastRef: (key?: string) => undefined | React.RefObject<HTMLDivElement>;
  shouldExpand: boolean;
}

export type ToastHeightRecord = Record<ToastId, number>;
interface UseToastHeightsReturnVal {
  /**
   * The vertical height of each toast in the stack
   */
  toastHeights: ToastHeightRecord;

  /**
   * The height of all toasts, including gaps
   */
  totalStackHeight: number;

  /**
   * Calculates the height from the bottom of the stack to the top of the given index
   */
  calcHeightForIndex: (stopIndex: number, isExpanded?: boolean) => number;

  /**
   * Re-calculates the heights of all toasts
   */
  updateToastHeights: () => void;
}

/**
 * Computes the height of each individual toast in the DOM
 * Returns {@link UseToastHeightsReturnVal} given {@link UseToastHeightsProps}
 *
 * @internal
 */
export function useToastHeights({
  stack,
  getToastRef,
  shouldExpand,
}: UseToastHeightsProps): UseToastHeightsReturnVal {
  /**
   * Keep track of all the toasts' heights
   * so we know how to absolutely position the rest of them
   */
  const calcToastHeights = useCallback((): ToastHeightRecord => {
    return Array.from(stack)
      .reverse() // reversing since the stack is oldest-first
      .reduce((record, [id]) => {
        const toastRef = getToastRef(id);
        let height = 0;

        if (toastRef?.current && toastRef.current.firstElementChild) {
          const contentHeight = toastRef.current.firstElementChild.clientHeight;
          const paddingHeight = spacing[2] * 2;

          const renderedHeight = toastRef.current.clientHeight;
          const borderHeight = 2;

          // Since we restrict toast heights when they're collapsed,
          // but we also set a min-heigh for short toasts,
          // the true expanded height of a toast is the larger of
          // rendered height, or content + padding
          height = Math.max(
            contentHeight + paddingHeight,
            renderedHeight + borderHeight,
          );
        }

        record[id] = height;
        return record;
      }, {} as ToastHeightRecord);
  }, [getToastRef, stack]);

  /**
   * Keep track of the vertical height of each toast in the stack, so we know how to render them all
   */
  const [toastHeights, setToastHeights] = useState<ToastHeightRecord>(
    calcToastHeights(),
  );

  /**
   * Calculates the combined heights of all toasts up to `stopIndex`
   *
   * @param stopIndex Stop counting the height at this toast index
   * @param isExpanded Whether the stack is expanded (determines whether to count all toasts, or just the top 3)
   */
  const calcHeightForIndex = useCallback(
    (stopIndex: number, isExpanded?: boolean): number => {
      if (stack.size <= 0) return 0;

      let totalHeight = 0;

      for (let index = 0; index < stack.size; index++) {
        const [id] = Array.from(stack).reverse()[index]; // reverse since stack is bottom-up

        if (index > stopIndex) {
          if (isExpanded || index < TOAST_CONSTANTS.shortStackCount) {
            totalHeight += toastHeights[id] + TOAST_CONSTANTS.gap;
          }
        }
      }

      return totalHeight;
    },
    [stack, toastHeights],
  );

  const totalStackHeight = useMemo(
    () => calcHeightForIndex(-1, shouldExpand),
    [calcHeightForIndex, shouldExpand],
  );

  const _updateToastHeights = useCallback(() => {
    setToastHeights(calcToastHeights());
  }, [calcToastHeights]);

  const updateToastHeights = useMemo(
    () => debounce(_updateToastHeights, 100),
    [_updateToastHeights],
  );

  return {
    toastHeights,
    totalStackHeight,
    calcHeightForIndex,
    updateToastHeights,
  };
}
