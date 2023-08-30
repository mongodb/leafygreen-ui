import { isUndefined } from 'lodash';

import {
  DateSegment,
  DateSegmentValue,
} from '../../DateInput/DateInputSegment';

/**
 * Returns whether a given value is a valid segment value
 */
export const isValidSegment = (segment?: DateSegmentValue): segment is number =>
  !isUndefined(segment) && !isNaN(Number(segment));

export const isValidSegmentName = (name?: string): name is DateSegment => {
  return (
    !isUndefined(name) &&
    Object.values(DateSegment).includes(name as DateSegment)
  );
};
