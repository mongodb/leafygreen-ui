import { DateType } from '@leafygreen-ui/date-utils';

import { DateSegmentsState } from '../../types';
import { getValueFormatter } from '../getValueFormatter';

import { getSegmentsFromDate } from './getSegmentsFromDate';

/** Returns a single object with _formatted_ day, month & year segments */
export const getFormattedSegmentsFromDate = (
  date: DateType,
): DateSegmentsState => {
  const segments = getSegmentsFromDate(date);

  return {
    day: getValueFormatter('day')(segments['day']),
    month: getValueFormatter('month')(segments['month']),
    year: getValueFormatter('year')(segments['year']),
  };
};
