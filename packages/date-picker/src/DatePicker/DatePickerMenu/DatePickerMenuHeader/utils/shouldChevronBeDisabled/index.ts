import { isSameUTCMonth } from '@leafygreen-ui/date-utils';

/**
 * Checks if chevron should be disabled
 *
 * @param direction left or right chevron
 * @param day1 the full date of the current month shown in the menu (month)
 * @param day2 the full date that current menu date is compared against (min/max)
 * @returns
 */
export const shouldChevronBeDisabled = (
  direction: 'left' | 'right',
  day1: Date,
  day2: Date,
): boolean => {
  if (!day1 || !day2) return false;

  if (direction === 'right') {
    return day1 >= day2 || isSameUTCMonth(day1, day2);
  }

  return day1 <= day2 || isSameUTCMonth(day1, day2);
};
