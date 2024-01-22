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
  value?: DateType,
) => {
  if (
    isSameUTCMonth(newMonth, currentMonth) ||
    isSameUTCMonth(newMonth, currentHighlight)
  ) {
    return;
  }

  if (value && isSameUTCMonth(newMonth, value)) {
    return value as Date;
  }

  let newHighlight: Date;

  if (isAfter(newMonth, currentMonth)) {
    newHighlight = getFirstOfUTCMonth(newMonth);
  } else {
    newHighlight = getLastOfMonth(newMonth);
  }

  return newHighlight;
};
