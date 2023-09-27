import { setUTCDate } from '../setUTCDate';

/** Returns the fist day of the provided month */
export const getFirstOfMonth = (date: Date) => {
  return setUTCDate(date, 1);
};
