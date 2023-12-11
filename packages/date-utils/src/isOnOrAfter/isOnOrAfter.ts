import { isAfter } from 'date-fns';

import { isSameUTCDay } from '../isSameUTCDay';

// TODO: tests
export const isOnOrAfter = (day: Date, dayToCompare: Date) => {
  return isSameUTCDay(day, dayToCompare) || isAfter(day, dayToCompare);
};
