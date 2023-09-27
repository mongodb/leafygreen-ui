import { isAfter } from 'date-fns';

import { getFirstOfMonth } from '../../../../utils/getFirstOfMonth';
import { getLastOfMonth } from '../../../../utils/getLastOfMonth';
import { isSameUTCMonth } from '../../../../utils/isSameUTCMonth';

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
