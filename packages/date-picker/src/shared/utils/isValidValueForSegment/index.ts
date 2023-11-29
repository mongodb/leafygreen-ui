import { inRange } from 'lodash';

import { defaultMax, defaultMin } from '../../constants';
import { DateSegment, DateSegmentValue } from '../../hooks';
import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';

/**
 * Returns whether a value is valid for a given segment type
 * @deprecated
 */
export const isValidValueForSegment = (
  segment: DateSegment,
  value: DateSegmentValue,
): boolean => {
  if (!(isValidSegmentValue(value) && isValidSegmentName(segment)))
    return false;
  return segment === 'year'
    ? true // Any year number is valid
    : inRange(Number(value), defaultMin[segment], defaultMax[segment] + 1);
};
