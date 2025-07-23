import isNull from 'lodash/isNull';

import { DateType, getMonthIndex } from '@leafygreen-ui/date-utils';

export const shouldMonthBeEnabled = (
  monthName: string,
  context?: {
    month?: DateType;
    min?: DateType;
    max?: DateType;
    locale?: string;
  },
): boolean => {
  const monthIndex = getMonthIndex(monthName, context?.locale);

  if (isNull(monthIndex)) return false;

  if (!context) {
    return true;
  }

  const { month, min, max } = context;

  const year = month?.getUTCFullYear();
  const minYear = min?.getUTCFullYear();
  const maxYear = max?.getUTCFullYear();

  if (year && minYear && year < minYear) return false;
  if (year && maxYear && year > maxYear) return false;

  if (month) {
    if (min && year === minYear && monthIndex < min.getUTCMonth()) return false;
    if (max && year === maxYear && monthIndex > max.getUTCMonth()) return false;
  }

  return true;
};
