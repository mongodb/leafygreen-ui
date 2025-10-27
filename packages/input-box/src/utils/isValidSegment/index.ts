import isUndefined from 'lodash/isUndefined';

/**
 * Returns whether a given value is a valid segment value
 */
export const isValidSegmentValue = <T extends string>(
  segment?: T,
): segment is T =>
  !isUndefined(segment) && !isNaN(Number(segment)) && Number(segment) > 0;

/**
 * A generic type predicate function that checks if a given string is one
 * of the values in the provided segment object.
 *
 * @param segmentObj The runtime object containing the valid string segments
 * @param name The string to validate
 * @returns A boolean and a type predicate (name is T[keyof T])
 *
 * @example
 * const segmentObj = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 * isValidSegmentName(segmentObj, 'day'); // true
 * isValidSegmentName(segmentObj, 'month'); // true
 * isValidSegmentName(segmentObj, 'year'); // true
 * isValidSegmentName(segmentObj, 'seconds'); // false
 */
export const isValidSegmentName = <T extends Readonly<Record<string, string>>>(
  segmentObj: T,
  name?: string,
): name is T[keyof T] => {
  return (
    !isUndefined(name) && Object.values(segmentObj).includes(name as T[keyof T])
  );
};
