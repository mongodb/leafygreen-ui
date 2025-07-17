import { useMemo } from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';

/**
 * Computes the total transition duration for a CSS animation based on
 * the change magnitude and a specified speed.
 *
 * Note: The previous value is tracked internally via a ref, so it
 * does not need to be provided as an argument.
 *
 * @param param.speed - Desired change in units per second.
 * @param param.currentValue - Current value in units.
 * @param [param.minimumDuration=150] - Minimum duration in milliseconds.
 * @param [param.maximumDuration=750] - Maximum duration in milliseconds.
 * @returns Duration in milliseconds.
 */
export const useComputedTransitionDuration = ({
  speed,
  currentValue,
  minimumDuration = 150,
  maximumDuration = 750,
}: {
  speed: number;
  currentValue?: number;
  minimumDuration?: number;
  maximumDuration?: number;
}) => {
  const previousValue = usePrevious(currentValue);

  const duration = useMemo(() => {
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

  return Math.min(Math.max(duration, minimumDuration), maximumDuration);
};
