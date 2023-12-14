import { setToUTCMidnight } from '../setToUTCMidnight';
import { setUTCDate } from '../setUTCDate';

/** Returns midnight on the fist day of the provided month */
export const getFirstOfUTCMonth = (date: Date) => {
  return setToUTCMidnight(setUTCDate(date, 1));
};
