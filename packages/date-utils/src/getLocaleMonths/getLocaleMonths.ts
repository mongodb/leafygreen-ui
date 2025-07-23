import range from 'lodash/range';

import { getMonthName } from '../getMonthName';
import { MonthObject } from '../types';

export const getLocaleMonths = (locale?: string): Array<MonthObject> => {
  return range(12).map(monthIndex => {
    return getMonthName(monthIndex, locale);
  });
};
