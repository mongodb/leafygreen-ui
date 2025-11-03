import inRange from 'lodash/inRange';

import {
  isValidSegmentName,
  isValidSegmentValue,
} from '../isValidSegment/isValidSegment';

interface IsValidValueForSegmentProps<
  SegmentName extends string,
  Value extends string,
> {
  segment: SegmentName;
  value: Value;
  defaultMin: number;
  defaultMax: number;
  segmentEnum: Readonly<Record<string, SegmentName>>;
  customValidation?: (value: Value) => boolean;
}

/**
 * Returns whether a value is valid for a given segment type
 * @param segment - The segment name
 * @param value - The value to check
 * @param defaultMin - The default minimum value for the segment
 * @param defaultMax - The default maximum value for the segment
 * @param segmentEnum - The segment object
 * @param customValidation - A custom validation function for the segment. This is useful for segments that allow values outside of the default range.
 * @returns Whether the value is valid for the segment
 * @example
 * // The segmentEnum is the object that contains the segment names and their corresponding values
 * const segmentEnum = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 * isValidValueForSegment({
 *   segment: 'day',
 *   value: '1',
 *   defaultMin: 1,
 *   defaultMax: 31,
 *   segmentEnum
 * }); // true
 * isValidValueForSegment({
 *   segment: 'day',
 *   value: '32',
 *   defaultMin: 1,
 *   defaultMax: 31,
 *   segmentEnum
 * }); // false
 * isValidValueForSegment({
 *   segment: 'month',
 *   value: '1',
 *   defaultMin: 1,
 *   defaultMax: 12,
 *   segmentEnum
 * }); // true
 * isValidValueForSegment({
 *   segment: 'month',
 *   value: '13',
 *   defaultMin: 1,
 *   defaultMax: 12,
 *   segmentEnum
 * }); // false
 * isValidValueForSegment({
 *   segment: 'year',
 *   value: '1970',
 *   defaultMin: 1000,
 *   defaultMax: 9999,
 *   segmentEnum
 * }); // true
 */
export const isValidValueForSegment = <
  SegmentName extends string,
  Value extends string,
>({
  segment,
  value,
  defaultMin,
  defaultMax,
  segmentEnum,
  customValidation,
}: IsValidValueForSegmentProps<SegmentName, Value>): boolean => {
  const isValidSegmentAndValue =
    isValidSegmentValue(value, defaultMin === 0) &&
    isValidSegmentName(segmentEnum, segment);

  if (customValidation) {
    return isValidSegmentAndValue && customValidation(value);
  }

  const isInRange = inRange(Number(value), defaultMin, defaultMax + 1);

  return isValidSegmentAndValue && isInRange;
};
