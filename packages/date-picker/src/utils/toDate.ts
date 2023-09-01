import { isDate, isValid, toDate as _toDate } from 'date-fns';

/** A wrapper around `date-fns.toDate` that also accepts strings */
export const toDate = (
  dateLike?: string | number | Date | null,
): Date | null => {
  if (!dateLike) return null;
  if (isDate(dateLike)) return dateLike as Date;
  if (typeof dateLike === 'number') return _toDate(dateLike);
  const newDate = new Date(dateLike);
  return isValid(newDate) ? newDate : null;
};
