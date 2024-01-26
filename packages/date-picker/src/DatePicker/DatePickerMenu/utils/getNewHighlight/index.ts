import { isAfter } from 'date-fns';

import {
  getFirstOfUTCMonth,
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
    newHighlight = getFirstOfUTCMonth(newMonth);
  } else {
    newHighlight = getLastOfMonth(newMonth);
  }

  return newHighlight;
};
