import { has, isNull, isUndefined } from 'lodash';

export const isValidDate = (
  maybeDate?: Date | string | null,
): maybeDate is Date | string => {
  if (isUndefined(maybeDate) || isNull(maybeDate)) return false;

  if (typeof maybeDate === 'string') {
    return isValidDateString(maybeDate);
  }

  if (typeof maybeDate === 'object') {
    return isValidDateObject(maybeDate);
  }

  return false;
};

export const isValidDateObject = (date?: any): date is Date => {
  return (
    !isUndefined(date) && typeof date === 'object' && has(date, 'getISOString')
  );
};

/** Returns whether the provided string is a valid date */
export const isValidDateString = (str?: any): str is string => {
  return (
    !isUndefined(str) && typeof str === 'string' && !isNaN(Date.parse(str))
  );
};
