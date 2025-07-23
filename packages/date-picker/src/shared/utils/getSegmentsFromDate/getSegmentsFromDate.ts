import { DateType, isValidDate } from '@leafygreen-ui/date-utils';

import { DateSegmentsState } from '../../types';

/** Returns a single object with day, month & year segments */
export const getSegmentsFromDate = (date: DateType): DateSegmentsState => {
  return {
    day: isValidDate(date) ? String(date.getUTCDate()) : '',
    month: isValidDate(date) ? String(date.getUTCMonth() + 1) : '',
    year: isValidDate(date) ? String(date.getUTCFullYear()) : '',
  };
};
