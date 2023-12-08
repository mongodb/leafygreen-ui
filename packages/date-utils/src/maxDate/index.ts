import { max } from 'date-fns';

import { isDefined } from '@leafygreen-ui/lib';

// TODO: tests
export const maxDate = (
  datesArray: Array<Date | null | undefined>,
): Date | undefined => {
  const filteredDates = datesArray.filter(isDefined) as Array<Date>;

  if (filteredDates.length > 0) {
    return max(filteredDates);
  }
};
