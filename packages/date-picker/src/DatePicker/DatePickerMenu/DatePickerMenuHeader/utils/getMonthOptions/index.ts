import isNull from 'lodash/isNull';

import { DateType } from '../../../../../shared/types';
import { getMonthIndex } from '../../../../../shared/utils';

export const shouldMonthBeEnabled = (
  monthName: string,
  context?: {
    month?: DateType;
    min?: DateType;
    max?: DateType;
  },
): boolean => {
  const monthIndex = getMonthIndex(monthName);

  if (isNull(monthIndex)) return false;

  if (!context) {
    return true;
  }

  const { month, min, max } = context;

  const year = context.month?.getUTCFullYear();
  const minYear = context.min?.getUTCFullYear();
  const maxYear = context.max?.getUTCFullYear();

  if (year && minYear && year < minYear) return false;
  if (year && maxYear && year > maxYear) return false;

  if (month && min && year === minYear) {
    if (monthIndex < min.getUTCMonth()) return false;
    return true;
  }

  if (month && max && year === maxYear) {
    if (monthIndex > max.getUTCMonth()) return false;
    return true;
  }

  return true;
};
