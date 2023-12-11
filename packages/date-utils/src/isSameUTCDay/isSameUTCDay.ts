/**
 * Returns whether 2 Dates are the same day in UTC.
 *
 * Compare to `date-fns.isSameDay`, which uses local time
 */
export const isSameUTCDay = (
  day1?: Date | null,
  day2?: Date | null,
): boolean => {
  if (!day1 || !day2) return false;

  return (
    day1.getUTCDate() === day2.getUTCDate() &&
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCFullYear() === day2.getUTCFullYear()
  );
};
