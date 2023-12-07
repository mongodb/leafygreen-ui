import { isSameUTCMonth } from '../../../../../shared/utils';

/**
 * Checks if chevron should be disabled
 *
 * @param direction left or right chevron
 * @param day1 the full date of the current month shown in the menu
 * @param day2 the full date that current menu date is compared against
 * @returns
 */
export const isChevronDisabled = (
  direction: 'left' | 'right',
  day1: Date | null, // month
  day2: Date | null, // min/max
): boolean => {
  if (!day1 || !day2) return false;

  if (direction === 'right') {
    return day1 >= day2 || isSameUTCMonth(day1, day2);
  }

  return day1 <= day2 || isSameUTCMonth(day1, day2);
};
