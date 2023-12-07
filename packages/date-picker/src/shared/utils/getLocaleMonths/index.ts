import range from 'lodash/range';

import { MonthObject } from '../../types';
import { getMonthName } from '../getMonthName';

export const getLocaleMonths = (locale?: string): Array<MonthObject> => {
  return range(12).map(monthIndex => {
    return getMonthName(monthIndex, locale);
  });
};
