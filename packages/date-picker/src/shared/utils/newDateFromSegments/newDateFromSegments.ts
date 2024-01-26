import { DateType, newUTC } from '@leafygreen-ui/date-utils';

import { DateSegmentsState } from '../../types';
import { doesSomeSegmentExist } from '../doesSomeSegmentExist';
import { isEverySegmentFilled } from '../isEverySegmentFilled';
import { isEverySegmentValid } from '../isEverySegmentValid';

/**
 * Constructs a date object in UTC from day, month, year segments
 */
export const newDateFromSegments = (segments: DateSegmentsState): DateType => {
  if (isEverySegmentFilled(segments) && isEverySegmentValid(segments)) {
    const { day, month, year } = segments;
    const newDate = newUTC(Number(year), Number(month) - 1, Number(day));
    // If day > daysInMonth, then the month will roll-over
    const isCorrectMonth = newDate.getUTCMonth() === Number(month) - 1;

    if (isCorrectMonth) {
      return newDate;
    }
  } else if (!doesSomeSegmentExist(segments)) {
    return null;
  }

  return new Date('invalid');
};
