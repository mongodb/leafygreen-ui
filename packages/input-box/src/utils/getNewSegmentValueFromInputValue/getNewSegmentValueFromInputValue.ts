import last from 'lodash/last';

import { truncateStart } from '@leafygreen-ui/lib';

import { isValidValueForSegment } from '..';

interface GetNewSegmentValueFromInputValue<
  SegmentName extends string,
  Value extends string,
> {
  segmentName: SegmentName;
  currentValue: Value;
  incomingValue: Value;
  charsPerSegment: number;
  defaultMin: number;
  defaultMax: number;
  segmentEnum: Readonly<Record<string, SegmentName>>;
  shouldSkipValidation?: boolean;
}

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
 * @param segmentEnum - The segment object
 * @param shouldSkipValidation - Whether the segment should skip validation. This is useful for segments that allow values outside of the default range.
 * @returns The new value for the segment
 * @example
 * // The segmentEnum is the object that contains the segment names and their corresponding values
 * const segmentEnum = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 *
 *  getNewSegmentValueFromInputValue({
 *   segmentName: 'day',
 *   currentValue: '0',
 *   incomingValue: '1',
 *   charsPerSegment: 2,
 *   defaultMin: 1,
 *   defaultMax: 31,
 *   segmentEnum
 * }); // '1'
 * getNewSegmentValueFromInputValue({
 *   segmentName: 'day',
 *   currentValue: '1',
 *   incomingValue: '12',
 *   charsPerSegment: 2,
 *   defaultMin: 1,
 *   defaultMax: 31,
 *   segmentEnum
 * }); // '12'
 * getNewSegmentValueFromInputValue({
 *   segmentName: 'day',
 *   currentValue: '1',
 *   incomingValue: '.',
 *   charsPerSegment: 2,
 *   defaultMin: 1,
 *   defaultMax: 31,
 *   segmentEnum
 * }); // '1'
 * getNewSegmentValueFromInputValue({
 *   segmentName: 'year',
 *   currentValue: '00',
 *   incomingValue: '000',
 *   charsPerSegment: 4,
 *   defaultMin: 1970,
 *   defaultMax: 2038,
 *   segmentEnum,
 *   shouldSkipValidation: true,
 * }); // '000'
 */
export const getNewSegmentValueFromInputValue = <
  SegmentName extends string,
  Value extends string,
>({
  segmentName,
  currentValue,
  incomingValue,
  charsPerSegment,
  defaultMin,
  defaultMax,
  segmentEnum,
  shouldSkipValidation = false,
}: GetNewSegmentValueFromInputValue<SegmentName, Value>): Value => {
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

  const isIncomingValueValid = isValidValueForSegment({
    segment: segmentName,
    value: incomingValue,
    defaultMin,
    defaultMax,
    segmentEnum,
  });

  if (isIncomingValueValid || shouldSkipValidation) {
    const newValue = truncateStart(incomingValue, {
      length: charsPerSegment,
    });

    return newValue as Value;
  }

  const typedChar = last(incomingValue.split(''));
  const newValue = typedChar === '0' ? '0' : typedChar ?? '';
  return newValue as Value;
};
