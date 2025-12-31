import { isValidDate } from '../isValidDate';
import { DateType } from '../types';
import { isSameUTCDateTime } from '../isSameUTCDateTime';
import { isBefore } from 'date-fns';
/**
 * Checks if a date is on or before a date and time
 * @param date - The date to check
 * @param dateToCompare - The date to compare to
 * @returns True if the date is on or before the date and time, false otherwise
 */
export const isOnOrBeforeDateTime = (
  date: DateType,
  dateToCompare: DateType,
) => {
  return (
    isValidDate(date) &&
    isValidDate(dateToCompare) &&
    (isSameUTCDateTime(date, dateToCompare) || isBefore(date, dateToCompare))
  );
};
