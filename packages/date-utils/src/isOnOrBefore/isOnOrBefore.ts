import { isBefore } from 'date-fns';

import { isSameUTCDay } from '../isSameUTCDay';

export const isOnOrBefore = (day: Date, dayToCompare: Date) => {
  return isSameUTCDay(day, dayToCompare) || isBefore(day, dayToCompare);
};
