import { min } from 'date-fns';

import { isDefined } from '../isDefined';

// TODO: tests
export const minDate = (
  datesArray: Array<Date | null | undefined>,
): Date | undefined => {
  const filteredDates = datesArray.filter(isDefined) as Array<Date>;

  if (filteredDates.length > 0) {
    return min(filteredDates);
  }
};
