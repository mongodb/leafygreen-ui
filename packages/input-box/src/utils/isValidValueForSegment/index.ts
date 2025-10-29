import inRange from 'lodash/inRange';

import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';

/**
 * Returns whether a value is valid for a given segment type
 * @param segment - The segment type
 * @param value - The value to check
 * @param defaultMin - The default minimum value for the segment
 * @param defaultMax - The default maximum value for the segment
 * @param segmentObj - The segment object
 * @param customValidation - A custom validation function for the segment. This is useful for segments that allow values outside of the default range.
 * @returns Whether the value is valid for the segment
 * @example
 * // The segmentObj is the object that contains the segment names and their corresponding values
 * const segmentObj = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 * isValidValueForSegment('day', '1', 1, 31, segmentObj); // true
 * isValidValueForSegment('day', '32', 1, 31, segmentObj); // false
 * isValidValueForSegment('month', '1', 1, 12, segmentObj); // true
 * isValidValueForSegment('month', '13', 1, 12, segmentObj); // false
 * isValidValueForSegment('year', '1970', 1000, 9999, segmentObj); // true
 */
export const isValidValueForSegment = <T extends string, V extends string>(
  segment: T,
  value: V,
  defaultMin: number,
  defaultMax: number,
  segmentObj: Readonly<Record<string, T>>,
  customValidation?: (value: V) => boolean,
): boolean => {
  const isValidSegmentAndValue =
    isValidSegmentValue(value, defaultMin === 0) &&
    isValidSegmentName(segmentObj, segment);

  if (customValidation) {
    return isValidSegmentAndValue && customValidation(value);
  }

  const isInRange = inRange(Number(value), defaultMin, defaultMax + 1);

  return isValidSegmentAndValue && isInRange;
};
