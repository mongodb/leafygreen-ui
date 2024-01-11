import { keyMap, rollover } from '@leafygreen-ui/lib';

import { DateSegment, DateSegmentValue } from '../../../../../types';

interface DateSegmentKeypressContext {
  value: DateSegmentValue;
  key: typeof keyMap.ArrowUp | typeof keyMap.ArrowDown;
  segment: DateSegment;
  min: number;
  max: number;
}

/**
 * Returns a new segment value given the current state
 */
export const getNewSegmentValueFromArrowKeyPress = ({
  value,
  key,
  segment,
  min,
  max,
}: DateSegmentKeypressContext): number => {
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
