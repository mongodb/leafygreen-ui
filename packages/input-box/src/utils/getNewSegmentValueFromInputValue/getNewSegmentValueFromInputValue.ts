import last from 'lodash/last';

import { truncateStart } from '@leafygreen-ui/lib';

import { isValidValueForSegment } from '..';

/**
 * Calculates the new value for the segment given an incoming change.
 *
 * Does not allow incoming values that
 * - are not valid numbers
 * - include a period
 * - would cause the segment to overflow
 *
 * @param segmentName - The name of the segment
 * @param currentValue - The current value of the segment
 * @param incomingValue - The incoming value to set
 * @param charsPerSegment - The number of characters per segment
 * @param defaultMin - The default minimum value for the segment
 * @param defaultMax - The default maximum value for the segment
 * @param segmentObj - The segment object
 * @param shouldSkipValidation - Whether the segment should skip validation. This is useful for segments that allow values outside of the default range.
 * @returns The new value for the segment
 * @example
 * // The segmentObj is the object that contains the segment names and their corresponding values
 * const segmentObj = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 * getNewSegmentValueFromInputValue('day', '1', '2', segmentObj['day'], 1, 31, segmentObj); // '2'
 * getNewSegmentValueFromInputValue('month', '1', '2', segmentObj['month'], 1, 12, segmentObj); // '2'
 * getNewSegmentValueFromInputValue('year', '1', '2', segmentObj['year'], 1970, 2038, segmentObj); // '2'
 * getNewSegmentValueFromInputValue('day', '1', '.', segmentObj['day'], 1, 31, segmentObj); // '1'
 */
export const getNewSegmentValueFromInputValue = <
  T extends string,
  V extends string,
>(
  segmentName: T,
  currentValue: V,
  incomingValue: V,
  charsPerSegment: number,
  defaultMin: number,
  defaultMax: number,
  segmentObj: Readonly<Record<string, T>>,
  shouldSkipValidation = false,
): V => {
  // If the incoming value is not a valid number
  const isIncomingValueNumber = !isNaN(Number(incomingValue));
  // macOS adds a period when pressing SPACE twice inside a text input.
  const doesIncomingValueContainPeriod = /\./.test(incomingValue);

  // if the current value is "full", do not allow any additional characters to be entered
  const wouldCauseOverflow =
    currentValue.length === charsPerSegment &&
    incomingValue.length > charsPerSegment;

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

  if (isIncomingValueValid || shouldSkipValidation) {
    const newValue = truncateStart(incomingValue, {
      length: charsPerSegment,
    });

    return newValue as V;
  }

  const typedChar = last(incomingValue.split(''));
  const newValue = typedChar === '0' ? '0' : typedChar ?? '';
  return newValue as V;
};
