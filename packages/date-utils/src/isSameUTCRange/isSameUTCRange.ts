import isUndefined from 'lodash/isUndefined';

import { isSameUTCDay } from '../isSameUTCDay';
import { DateType } from '../types';

export const isSameUTCRange = (
  range1?: [DateType, DateType],
  range2?: [DateType, DateType],
): boolean => {
  if (isUndefined(range1) || isUndefined(range2)) return false;

  const [start1, end1] = range1;
  const [start2, end2] = range2;

  return isSameUTCDay(start1, start2) && isSameUTCDay(end1, end2);
};
