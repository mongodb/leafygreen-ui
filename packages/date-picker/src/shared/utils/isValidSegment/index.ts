import isUndefined from 'lodash/isUndefined';

import { DateSegment, DateSegmentValue } from '../../types';

/**
 * Returns whether a given value is a valid segment value
 */
// export const isValidSegmentValue = (
//   segment?: DateSegmentValue,
// ): segment is DateSegmentValue =>
//   !isUndefined(segment) && !isNaN(Number(segment)) && Number(segment) > 0;

export const isValidSegmentValue = <T>(segment?: T): segment is T =>
  !isUndefined(segment) && !isNaN(Number(segment)) && Number(segment) > 0;

// /**
//  * Returns whether a given string is a valid segment name (day, month, year)
//  */
// export const isValidSegmentName = (name?: string): name is DateSegment => {
//   return (
//     !isUndefined(name) &&
//     Object.values(DateSegment).includes(name as DateSegment)
//   );
// };

// 1. Define a type helper for the segment object structure
type SegmentObject = Readonly<Record<string, string>>;

/**
 * A generic type predicate function that checks if a given string is one
 * of the values in the provided segment object.
 *
 * @param segmentObj The runtime object containing the valid string segments (must be 'as const')
 * @param name The string to validate
 * @returns A boolean and a type predicate (name is T[keyof T])
 */
export const isValidSegmentName = <T extends SegmentObject>(
  segmentObj: T,
  name?: string,
): name is T[keyof T] => {
  return (
    !isUndefined(name) &&
    Object.values(segmentObj).includes(
      name as (typeof segmentObj)[keyof typeof segmentObj],
    )
  );
};
