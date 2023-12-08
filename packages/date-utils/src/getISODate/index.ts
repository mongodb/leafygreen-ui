import { DateType } from '../../types';
import { isValidDate } from '../isValidDate';

/**
 * Returns only the Date portion of the ISOString for a given date
 * i.e. 2023-11-01T00:00:00.000Z => 2023-11-01
 */
export const getISODate = (date?: DateType): string => {
  if (!isValidDate(date)) return '';

  const isoString = date.toISOString();
  const isoDate = isoString.split('T')[0];
  return isoDate;
};
