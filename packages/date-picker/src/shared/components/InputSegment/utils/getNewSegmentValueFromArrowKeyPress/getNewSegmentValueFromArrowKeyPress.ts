import { keyMap, rollover } from '@leafygreen-ui/lib';

interface DateSegmentKeypressContext<T extends string, V extends string> {
  value: V;
  key: typeof keyMap.ArrowUp | typeof keyMap.ArrowDown;
  segment: T;
  min: number;
  max: number;
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
}: DateSegmentKeypressContext<T, V>): number => {
  const valueDiff = key === keyMap.ArrowUp ? 1 : -1;
  const defaultVal = key === keyMap.ArrowUp ? min : max;

  const incrementedValue: number = value
    ? Number(value) + valueDiff
    : defaultVal;

  const newValue =
    segment === 'year'
      ? incrementedValue
      : rollover(incrementedValue, min, max);

  return newValue;
};
