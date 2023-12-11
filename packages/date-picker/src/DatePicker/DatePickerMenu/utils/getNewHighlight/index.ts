import { isAfter } from 'date-fns';

import {
  getFirstOfMonth,
  getLastOfMonth,
  isSameUTCMonth,
} from '@leafygreen-ui/date-utils';

export const getNewHighlight = (
  currentHighlight: Date | null,
  currentMonth: Date,
  newMonth: Date,
) => {
  if (
    isSameUTCMonth(newMonth, currentMonth) ||
    isSameUTCMonth(newMonth, currentHighlight)
  ) {
    return;
  }

  let newHighlight: Date;

  if (isAfter(newMonth, currentMonth)) {
    newHighlight = getFirstOfMonth(newMonth);
  } else {
    newHighlight = getLastOfMonth(newMonth);
  }

  return newHighlight;
};
