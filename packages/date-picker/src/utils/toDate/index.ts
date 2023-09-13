import { isValid, toDate as _toDate } from 'date-fns';
import { isNull, isUndefined } from 'lodash';

import { isValidDateObject } from '../isValidDate';

/** A wrapper around `date-fns.toDate` that also accepts strings */
export function toDate(dateLike?: string | number | Date | null): Date | null {
  if (isUndefined(dateLike) || isNull(dateLike)) return null;
  if (isValidDateObject(dateLike)) return new Date(dateLike);
  if (typeof dateLike === 'number') return _toDate(dateLike);
  const newDate = new Date(dateLike);
  return isValid(newDate) ? newDate : null;
}
