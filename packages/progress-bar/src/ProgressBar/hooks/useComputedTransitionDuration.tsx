import { useMemo } from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';
import { isDefined } from '@leafygreen-ui/lib';

interface TransitionDurationParams {
  /** Desired change in units per second */
  speed: number;
  /** Current value in units */
  currentValue?: number;
  /** Minimum duration in milliseconds */
  minimumDuration?: number;
  /** Maximum duration in milliseconds */
  maximumDuration?: number;
}

/**
 * Computes the total transition duration for a CSS animation based on
 * the change magnitude and a specified speed.
 *
 * Note: The previous value is tracked internally via a ref, so it
 * does not need to be provided as an argument.
 */
export const useComputedTransitionDuration = ({
  speed,
  currentValue,
  minimumDuration = 150,
  maximumDuration = 750,
}: TransitionDurationParams) => {
  const previousValue = usePrevious(currentValue);

  const duration = useMemo(() => {
    if (
      speed <= 0 ||
      !isDefined(previousValue) ||
      !isDefined(currentValue) ||
      previousValue === currentValue
    ) {
      return minimumDuration;
    }

    const magnitude = Math.abs(currentValue - previousValue);
    return (magnitude / speed) * 1000;
  }, [speed, previousValue, currentValue, minimumDuration]);

  return Math.min(Math.max(duration, minimumDuration), maximumDuration);
};
