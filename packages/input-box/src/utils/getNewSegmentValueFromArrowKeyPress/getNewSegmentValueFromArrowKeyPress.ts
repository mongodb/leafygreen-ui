import { keyMap, rollover } from '@leafygreen-ui/lib';

interface GetNewSegmentValueFromArrowKeyPress<Value extends string> {
  value: Value;
  key: typeof keyMap.ArrowUp | typeof keyMap.ArrowDown;
  min: number;
  max: number;
  step?: number;
  shouldRollover?: boolean;
}

/**
 * Returns a new segment value given the current state
 *
 * @param value - The current value of the segment
 * @param key - The key pressed
 * @param min - The minimum value for the segment
 * @param max - The maximum value for the segment
 * @param step - The step value for the arrow keys
 * @param shouldRollover - If the segment should rollover when the value is at the min or max boundary
 * @returns The new value for the segment
 * @example
 * getNewSegmentValueFromArrowKeyPress({ value: '1', key: 'ArrowUp', min: 1, max: 31, step: 1}); // 2
 * getNewSegmentValueFromArrowKeyPress({ value: '1', key: 'ArrowDown', min: 1, max: 31, step: 1}); // 31
 * getNewSegmentValueFromArrowKeyPress({ value: '1', key: 'ArrowUp', min: 1, max: 12, step: 1}); // 2
 * getNewSegmentValueFromArrowKeyPress({ value: '1', key: 'ArrowDown', min: 1, max: 12, step: 1}); // 12
 * getNewSegmentValueFromArrowKeyPress({ value: '1970', key: 'ArrowUp', min: 1970, max: 2038, step: 1 }); // 1971
 * getNewSegmentValueFromArrowKeyPress({ value: '2038', key: 'ArrowUp', min: 1970, max: 2038, step: 1, shouldRollover: false }); // 2039
 */
export const getNewSegmentValueFromArrowKeyPress = <Value extends string>({
  value,
  key,
  min,
  max,
  shouldRollover = true,
  step = 1,
}: GetNewSegmentValueFromArrowKeyPress<Value>): number => {
  const valueDiff = key === keyMap.ArrowUp ? step : -step;
  const defaultVal = key === keyMap.ArrowUp ? min : max;

  const incrementedValue: number = value
    ? Number(value) + valueDiff
    : defaultVal;

  const newValue = shouldRollover
    ? rollover(incrementedValue, min, max)
    : incrementedValue;

  return newValue;
};
