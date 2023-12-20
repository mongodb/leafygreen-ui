import { isValid } from 'date-fns';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import { DateType } from '../types';
import { InvalidDate } from '../types/InvalidDate';

/**
 * An extension of `date-fns` {@link isValid}
 * that accepts a {@link DateType}
 */
export const isValidDate = (date?: DateType): date is Date => {
  // Enumerating all cases to ensure test coverage
  if (isUndefined(date)) return false;
  if (isNull(date)) return false;
  if (!isDateObject(date)) return false;
  if (isInvalidDateObject(date)) return false;

  return isValid(date);
};

/**
 * Returns whether the provided string is a valid date
 *
 * @deprecated Prefer {@link isValid} from `date-fns`
 */
export const isValidDateString = (str?: any): str is string => {
  return (
    !isUndefined(str) && typeof str === 'string' && !isNaN(Date.parse(str))
  );
};

/** Whether the given object is a `Date` object */
export const isDateObject = (date: any): date is Date | InvalidDate => {
  return (
    !isNull(date) &&
    !isUndefined(date) &&
    typeof date === 'object' &&
    date.constructor.name == 'Date' &&
    typeof date.toISOString === 'function'
  );
};

/**
 * Returns whether a given object is a Date object that will print `"Invalid Date"`
 */
export const isInvalidDateObject = (date: DateType): date is InvalidDate => {
  if (isNull(date)) return false;
  if (!isDateObject(date)) return false;

  try {
    date.toISOString();
    return false;
  } catch {
    return true;
  }
};
