import { min } from 'date-fns';

import { isDefined } from '@leafygreen-ui/lib';

/**
 * Returns the fist date of an array of dates
 */
export const minDate = (
  datesArray: Array<Date | null | undefined>,
): Date | undefined => {
  const filteredDates = datesArray.filter(isDefined) as Array<Date>;

  if (filteredDates.length > 0) {
    return min(filteredDates);
  }
};
