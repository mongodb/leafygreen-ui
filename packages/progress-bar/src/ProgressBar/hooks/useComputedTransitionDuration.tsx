import { useMemo } from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';

/**
 * Computes the total transition duration for a CSS animation based on the
 * magnitude of change in value and a specified speed.
 *
 * @param {number} speed - Desired change in units per second
 * @param {number} currentValue - Current value in units
 * @param {number} [minimumTransitionDuration=150] - minimum duration in milliseconds
 * @param {number} [maximumTransitionDuration=750] - maximum duration in milliseconds
 * @returns {number} Duration in milliseconds
 */
export const useComputedTransitionDuration = ({
  speed,
  currentValue,
  minimumTransitionDuration = 150,
  maximumTransitionDuration = 750,
}: {
  speed: number;
  currentValue?: number;
  minimumTransitionDuration?: number;
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

  return Math.min(
    Math.max(transitionDuration, minimumTransitionDuration),
    maximumTransitionDuration,
  );
};
