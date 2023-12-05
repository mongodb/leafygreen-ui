import { defaultMax } from '../../constants';
import { DateSegment } from '../../hooks';
import { DateType } from '../../types';
import { getSegmentsFromDate } from '../getSegmentsFromDate';

/** Returns the maximum value for a segment, given a context */
export const getMaxSegmentValue = (
  segment: DateSegment,
  context?: {
    date?: DateType;
    max?: Date;
  },
): number => {
  if (segment === 'year') {
    return context?.max
      ? Number(getSegmentsFromDate(context.max)['year'])
      : defaultMax['year'];
  }

  return defaultMax[segment];
};
