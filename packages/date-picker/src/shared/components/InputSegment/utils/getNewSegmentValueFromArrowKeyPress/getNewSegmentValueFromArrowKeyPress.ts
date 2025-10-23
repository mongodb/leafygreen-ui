import { keyMap, rollover } from '@leafygreen-ui/lib';

interface GetNewSegmentValueFromArrowKeyPress<
  T extends string,
  V extends string,
> {
  value: V;
  key: typeof keyMap.ArrowUp | typeof keyMap.ArrowDown;
  segment: T;
  min: number;
  max: number;
  step?: number | Partial<Record<T, number>>;
  shouldNotRollover?: T | Array<T>;
}

/**
 * Returns a new segment value given the current state
 */
export const getNewSegmentValueFromArrowKeyPress = <
  T extends string,
  V extends string,
>({
  value,
  key,
  segment,
  min,
  max,
  shouldNotRollover,
  step = 1,
}: GetNewSegmentValueFromArrowKeyPress<T, V>): number => {
  const stepValue = typeof step === 'number' ? step : step[segment] ?? 1;

  const valueDiff = key === keyMap.ArrowUp ? stepValue : -stepValue;
  const defaultVal = key === keyMap.ArrowUp ? min : max;

  const incrementedValue: number = value
    ? Number(value) + valueDiff
    : defaultVal;

  let shouldSkipRollover = false;
  if (shouldNotRollover !== undefined) {
    if (typeof shouldNotRollover === 'string') {
      shouldSkipRollover = segment === shouldNotRollover;
    } else if (Array.isArray(shouldNotRollover)) {
      shouldSkipRollover = shouldNotRollover.includes(segment);
    }
  }

  const newValue = shouldSkipRollover
    ? incrementedValue
    : rollover(incrementedValue, min, max);

  return newValue;
};
