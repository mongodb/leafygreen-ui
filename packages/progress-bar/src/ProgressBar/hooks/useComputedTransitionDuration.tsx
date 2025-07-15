import { useMemo } from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';

/**
 * Computes the transition duration based on the change in value and a specified speed.
 * @param {number} speed - Desired change in units per second
 * @param {number} currentValue - Current value in units
 * @returns {number} Duration in milliseconds
 */
export const useComputedTransitionDuration = ({
  speed,
  currentValue,
  maximumTransitionDuration = 750,
}: {
  speed: number;
  currentValue?: number;
  maximumTransitionDuration?: number;
}) => {
  const previousValue = usePrevious(currentValue);

  const transitionDuration = useMemo(() => {
    if (
      speed <= 0 ||
      !previousValue ||
      !currentValue ||
      previousValue === currentValue
    ) {
      return 0;
    }

    const magnitude = Math.abs(currentValue - previousValue);
    return (magnitude / speed) * 1000;
  }, [speed, previousValue, currentValue]);

  return Math.min(transitionDuration, maximumTransitionDuration);
};
