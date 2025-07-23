import { isAfter } from 'date-fns';

import { isSameUTCDay } from '../isSameUTCDay';
import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

// TODO: tests
export const isOnOrAfter = (day: DateType, dayToCompare: Date) => {
  return (
    isValidDate(day) &&
    isValidDate(dayToCompare) &&
    (isSameUTCDay(day, dayToCompare) || isAfter(day, dayToCompare))
  );
};
