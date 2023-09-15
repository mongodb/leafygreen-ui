import { isValid } from 'date-fns';
import { isNull, isUndefined } from 'lodash';

export const isValidDate = (
  maybeDate?: Date | string | number | null,
): maybeDate is Date | string => {
  if (isUndefined(maybeDate) || isNull(maybeDate)) return false;

  switch (typeof maybeDate) {
    case 'string':
      return isValidDateString(maybeDate);
    case 'number':
      return isValid(maybeDate);

    default:
      return isValidDateObject(maybeDate);
  }
};

export const isValidDateObject = (date?: any): date is Date => {
  return (
    !isUndefined(date) &&
    typeof date === 'object' &&
    date.constructor.name === 'Date'
  );
};

/** Returns whether the provided string is a valid date */
export const isValidDateString = (str?: any): str is string => {
  return (
    !isUndefined(str) && typeof str === 'string' && !isNaN(Date.parse(str))
  );
};
