import isUndefined from 'lodash/isUndefined';

import { DateSegment, DateSegmentValue } from '../../types';

/**
 * Returns whether a given value is a valid segment value
 */
export const isValidSegmentValue = (
  segment?: DateSegmentValue,
): segment is DateSegmentValue =>
  !isUndefined(segment) && !isNaN(Number(segment)) && Number(segment) > 0;

/**
 * Returns whether a given string is a valid segment name (day, month, year)
 */
export const isValidSegmentName = (name?: string): name is DateSegment => {
  return (
    !isUndefined(name) &&
    Object.values(DateSegment).includes(name as DateSegment)
  );
};
