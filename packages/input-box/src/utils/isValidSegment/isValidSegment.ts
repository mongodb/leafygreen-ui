import isUndefined from 'lodash/isUndefined';

/**
 * Returns whether a given value is a valid segment value
 *
 * @param segment - The segment value to validate
 * @param allowZero - Whether to allow zero as a valid segment value
 * @returns Whether the segment value is valid
 *
 * @example
 * isValidSegmentValue('1'); // true
 * isValidSegmentValue('0'); // false
 * isValidSegmentValue('0', true); // true
 * isValidSegmentValue('00', true); // true
 */
export const isValidSegmentValue = <T extends string>(
  segment?: T,
  allowZero = false,
): segment is T =>
  !isUndefined(segment) &&
  !isNaN(Number(segment)) &&
  (Number(segment) > 0 || allowZero);

/**
 * A generic type predicate function that checks if a given string is one
 * of the values in the provided segment object.
 *
 * @param segmentEnum The runtime object containing the valid string segments
 * @param name The string to validate
 * @returns A boolean and a type predicate (name is T[keyof T])
 *
 * @example
 * const segmentEnum = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 * isValidSegmentName(segmentEnum, 'day'); // true
 * isValidSegmentName(segmentEnum, 'month'); // true
 * isValidSegmentName(segmentEnum, 'year'); // true
 * isValidSegmentName(segmentEnum, 'seconds'); // false
 */
export const isValidSegmentName = <T extends Readonly<Record<string, string>>>(
  segmentEnum: T,
  name?: string,
): name is T[keyof T] => {
  return (
    !isUndefined(name) &&
    Object.values(segmentEnum).includes(name as T[keyof T])
  );
};
