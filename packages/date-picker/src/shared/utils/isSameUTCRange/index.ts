import isUndefined from 'lodash/isUndefined';

import { isSameUTCDay } from '../isSameUTCDay';

export const isSameUTCRange = (
  range1?: [Date | null, Date | null],
  range2?: [Date | null, Date | null],
): boolean => {
  if (isUndefined(range1) || isUndefined(range2)) return false;

  const [start1, end1] = range1;
  const [start2, end2] = range2;

  return isSameUTCDay(start1, start2) && isSameUTCDay(end1, end2);
};
