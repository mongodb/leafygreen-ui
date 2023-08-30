import { isUndefined } from 'lodash';

import { DateSegmentValue } from '../../DateInputSegment';

/**
 * Returns whether a given value is a valid segment value
 */
export const isValidSegment = (segment?: DateSegmentValue): segment is number =>
  !isUndefined(segment) && !isNaN(Number(segment));
