import last from 'lodash/last';

import { truncateStart } from '@leafygreen-ui/lib';
import { isValidValueForSegment } from '../../../../utils';

/**
 * Calculates the new value for the segment given an incoming change.
 *
 * Does not allow incoming values that
 * - are not valid numbers
 * - include a period
 * - would cause the segment to overflow
 */
export const getNewSegmentValueFromInputValue = <
  T extends string,
  V extends string,
>(
  segmentName: T,
  currentValue: V,
  incomingValue: V,
  charsPerSegment: Record<T, number>,
  defaultMin: Record<T, number>,
  defaultMax: Record<T, number>,
  segmentObj: Readonly<Record<string, T>>,
): V => {
  // If the incoming value is not a valid number
  const isIncomingValueNumber = !isNaN(Number(incomingValue));
  // macOS adds a period when pressing SPACE twice inside a text input.
  const doesIncomingValueContainPeriod = /\./.test(incomingValue);

  // if the current value is "full", do not allow any additional characters to be entered
  const wouldCauseOverflow =
    currentValue.length === charsPerSegment[segmentName] &&
    incomingValue.length > charsPerSegment[segmentName];

  if (
    !isIncomingValueNumber ||
    doesIncomingValueContainPeriod ||
    wouldCauseOverflow
  ) {
    return currentValue;
  }

  const isIncomingValueValid = isValidValueForSegment(
    segmentName,
    incomingValue,
    defaultMin,
    defaultMax,
    segmentObj,
  );

  if (isIncomingValueValid || segmentName === 'year') {
    const newValue = truncateStart(incomingValue, {
      length: charsPerSegment[segmentName],
    });

    return newValue as V;
  }

  const typedChar = last(incomingValue.split(''));
  const newValue = typedChar === '0' ? '0' : typedChar ?? '';
  return newValue as V;
};
