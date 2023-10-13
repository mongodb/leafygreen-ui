import { min } from 'date-fns';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

// TODO: tests
export const minDate = (
  datesArray: Array<Date | null | undefined>,
): Date | undefined => {
  const filteredDates = datesArray.filter(
    d => !isNull(d) && !isUndefined(d),
  ) as Array<Date>;

  if (filteredDates.length > 0) {
    return min(filteredDates);
  }
};
