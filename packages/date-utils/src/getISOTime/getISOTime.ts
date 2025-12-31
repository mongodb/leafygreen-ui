import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

/**
 * Returns the Date and Time portion of the ISOString for a given date
 * i.e. 2023-11-01T00:00:00.000Z => 00:00:00.000Z
 */
export const getISOTime = (date: DateType): string => {
  if (!isValidDate(date)) return '';

  return date.toISOString().split('T')[1];
};
