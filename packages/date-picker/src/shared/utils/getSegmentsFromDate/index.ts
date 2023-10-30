import { DateSegmentsState } from '../../hooks';
import { getValueFormatter } from '../getValueFormatter';

/** Returns a single object with day, month & year segments */
export const getSegmentsFromDate = (date: Date | null): DateSegmentsState => {
  return {
    day: date ? date.getUTCDate() : undefined,
    month: date ? date.getUTCMonth() + 1 : undefined,
    year: date ? date.getUTCFullYear() : undefined,
  } as DateSegmentsState;
};

/** Returns a single object with _formatted_ day, month & year segments */
export const getFormattedSegmentsFromDate = (
  date: Date | null,
): DateSegmentsState => {
  const segments = getSegmentsFromDate(date);

  return {
    day: getValueFormatter('day')(segments['day']),
    month: getValueFormatter('month')(segments['month']),
    year: getValueFormatter('year')(segments['year']),
  };
};
