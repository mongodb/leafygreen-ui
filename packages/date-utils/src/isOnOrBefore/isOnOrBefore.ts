import { isBefore } from 'date-fns';

import { isSameUTCDay } from '../isSameUTCDay';
import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

export const isOnOrBefore = (day: DateType, dayToCompare: DateType) => {
  return (
    isValidDate(day) &&
    isValidDate(dayToCompare) &&
    (isSameUTCDay(day, dayToCompare) || isBefore(day, dayToCompare))
  );
};
