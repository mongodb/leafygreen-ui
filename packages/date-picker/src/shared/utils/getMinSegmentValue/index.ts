import { DateType } from '@leafygreen-ui/date-utils';

import { defaultMin } from '../../constants';
import { DateSegment } from '../../types';
import { getSegmentsFromDate } from '../getSegmentsFromDate';

/** Returns the minimum value for a segment, given a context */
export const getMinSegmentValue = (
  segment: DateSegment,
  context?: {
    date?: DateType;
    min?: Date;
  },
): number => {
  if (segment === 'year') {
    return context?.min
      ? Number(getSegmentsFromDate(context.min)['year'])
      : defaultMin['year'];
  }

  return defaultMin[segment];
};
