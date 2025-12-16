import { isWithinInterval } from 'date-fns';
import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

/**
 * Returns an `isInRange` function,
 * with `min` and `max` values in the closure
 */
export const isInRange = (min: Date, max: Date) => {
  return (date?: DateType): boolean => {
    if (!isValidDate(date)) {
      return false;
    }

    return isWithinInterval(date, { start: min, end: max });
  };
};
