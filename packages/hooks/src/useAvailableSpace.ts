import { useMemo } from 'react';

import useViewportSize from './useViewportSize';

/**
 * Returns the maximum space available above or below the source trigger
 * @param triggerRef The `ref` object attached to the source trigger
 * @param margin The space around the trigger
 */
const useAvailableSpace = (
  triggerRef?: React.RefObject<HTMLElement>,
  margin = 8,
) => {
  const viewportSize = useViewportSize();

  return useMemo(() => {
    if (viewportSize && triggerRef && triggerRef.current) {
      // Get the top & bottom coordinates of the trigger
      const { top: triggerTop, bottom: triggerBottom } =
        triggerRef.current.getBoundingClientRect();

      // Find out how much space is available above or below the trigger
      const safeSpace = Math.max(
        viewportSize.height - triggerBottom,
        triggerTop,
      );

      // Return to fill the space available
      return safeSpace - margin;
    }
  }, [viewportSize, triggerRef, margin]);
};

export default useAvailableSpace;
