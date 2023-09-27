import { setToUTCMidnight } from '../setToUTCMidnight';
import { setUTCDate } from '../setUTCDate';

/** Returns midnight on the fist day of the provided month */
export const getFirstOfMonth = (date: Date) => {
  return setToUTCMidnight(setUTCDate(date, 1));
};
