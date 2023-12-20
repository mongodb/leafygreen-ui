import { isValid } from 'date-fns';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import { DateType } from '../types';

/**
 * An extension of `date-fns` {@link isValid}
 * that accepts a {@link DateType}
 */
export const isValidDate = (date?: DateType): date is Date => {
  // Enumerating all cases to ensure test coverage
  if (isUndefined(date)) return false;
  if (isNull(date)) return false;
  if (date.constructor.name !== 'Date') return false;

  try {
    date?.toISOString();
    return isValid(date);
  } catch (error) {
    return false;
  }
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
