import { isSameUTCDay } from '../isSameUTCDay';

/**
 * Returns whether a given day is today, in UTC
 *
 * Compare to `date-fns.isToday`, which compares using local time
 */
export const isCurrentUTCDay = (day?: Date | null): day is Date => {
  const today = new Date(Date.now());
  return isSameUTCDay(day, today);
};
