import { isAfter } from 'date-fns';

import {
  DateType,
  getFirstOfUTCMonth,
  getLastOfMonth,
  isSameUTCMonth,
} from '@leafygreen-ui/date-utils';

export const getNewHighlight = (
  currentHighlight: Date | null,
  currentMonth: Date,
  newMonth: Date,
  currentValue?: DateType,
) => {
  if (
    isSameUTCMonth(newMonth, currentMonth) ||
    isSameUTCMonth(newMonth, currentHighlight)
  ) {
    return;
  }

  if (currentValue && isSameUTCMonth(newMonth, currentValue)) {
    return currentValue as Date;
  }

  let newHighlight: Date;

  if (isAfter(newMonth, currentMonth)) {
    newHighlight = getFirstOfUTCMonth(newMonth);
  } else {
    newHighlight = getLastOfMonth(newMonth);
  }

  return newHighlight;
};
