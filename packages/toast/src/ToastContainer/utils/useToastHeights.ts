import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { spacing } from '@leafygreen-ui/tokens';

import { TOAST } from '../../constants';
import { ToastStack } from '../../ToastContext';

interface UseToastHeightsProps {
  stack: ToastStack;
  getToastRef: (key?: string) => undefined | React.RefObject<HTMLDivElement>;
  shouldExpand: boolean;
}

export function useToastHeights({
  stack,
  getToastRef,
  shouldExpand,
}: UseToastHeightsProps) {
  /**
   * Keep track of all the toasts' heights
   * so we know how to absolutely position the rest of them
   */
  const calcToastHeights = useCallback(() => {
    return Array.from(stack)
      .reverse() // reversing since the stack is oldest-first
      .map(([id]) => {
        const ref = getToastRef(id);

        // Height of the content + padding
        if (ref?.current) {
          return ref.current.firstElementChild
            ? ref.current.firstElementChild?.clientHeight + spacing[2] * 2
            : 0;
        }

        return 0;
      })
      .filter(h => h >= 0);
  }, [getToastRef, stack]);

  /**
   * Keep track of the vertical height of each toast in the stack, so we know how to render them all
   */
  const [toastHeights, setToastHeights] = useState<Array<number>>(
    calcToastHeights(),
  );

  const totalStackHeight = useMemo(
    () => calcTotalStackHeight(toastHeights, shouldExpand),
    [shouldExpand, toastHeights],
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
    updateToastHeights,
  };
}

/**
 * Calculates the combined heights of all toasts,
 * or all toasts up to `stopIndex`
 *
 * @param toastHeights The array of toast heights
 * @param isExpanded Whether the stack is expanded (determines whether to count all toasts, or just the top 3)
 * @param stopIndex Stop counting the height at this toast index
 */
export function calcTotalStackHeight(
  toastHeights: Array<number>,
  isExpanded?: boolean,
  stopIndex = -1,
) {
  return toastHeights.reduce(
    (sum, x, j) =>
      // if the comparing toast is below the current toast
      // but also less than the shortStackCount
      // add that toast's height to this toast's offset
      j > stopIndex && (isExpanded || j < TOAST.shortStackCount)
        ? sum + x + TOAST.gap
        : sum,
    0,
  );
}
