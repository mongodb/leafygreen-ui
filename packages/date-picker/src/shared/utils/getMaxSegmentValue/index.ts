import {
  DateType,
  getDaysInUTCMonth,
  isValidDate,
} from '@leafygreen-ui/date-utils';

import { defaultMax } from '../../constants';
import { DateSegment } from '../../types';
import { getSegmentsFromDate } from '../getSegmentsFromDate';

/** Returns the maximum value for a segment, given a context */
export const getMaxSegmentValue = (
  segment: DateSegment,
  context?: {
    date?: DateType;
    max?: Date;
  },
): number => {
  switch (segment) {
    case 'year':
      return context?.max
        ? Number(getSegmentsFromDate(context.max)['year'])
        : defaultMax['year'];
    case 'month':
      return defaultMax['month'];

    case 'day':
      return context && isValidDate(context?.date)
        ? getDaysInUTCMonth(context.date)
        : defaultMax['day'];
  }
};
