import { DateType } from '@leafygreen-ui/date-utils';

import { charsPerSegment } from '../../constants';
import { DateSegmentsState } from '../../types';
import { getValueFormatter } from '../getValueFormatter';

import { getSegmentsFromDate } from './getSegmentsFromDate';

/** Returns a single object with _formatted_ day, month & year segments */
export const getFormattedSegmentsFromDate = (
  date: DateType,
): DateSegmentsState => {
  const segments = getSegmentsFromDate(date);

  return {
    day: getValueFormatter('day', charsPerSegment)(segments['day']),
    month: getValueFormatter('month', charsPerSegment)(segments['month']),
    year: getValueFormatter('year', charsPerSegment)(segments['year']),
  };
};
