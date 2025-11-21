import { DateType } from '@leafygreen-ui/date-utils';
import { getValueFormatter } from '@leafygreen-ui/input-box';

import { charsPerSegment } from '../../constants';
import { DateSegmentsState } from '../../types';

import { getSegmentsFromDate } from './getSegmentsFromDate';

/** Returns a single object with _formatted_ day, month & year segments */
export const getFormattedSegmentsFromDate = (
  date: DateType,
): DateSegmentsState => {
  const segments = getSegmentsFromDate(date);

  return {
    day: getValueFormatter({ charsCount: charsPerSegment['day'] })(
      segments['day'],
    ),
    month: getValueFormatter({ charsCount: charsPerSegment['month'] })(
      segments['month'],
    ),
    year: getValueFormatter({ charsCount: charsPerSegment['year'] })(
      segments['year'],
    ),
  };
};
