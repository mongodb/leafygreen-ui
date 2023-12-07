import range from 'lodash/range';

import { getWeekdayName } from '../getWeekdayName';

export const getLocaleWeekdays = (locale?: string) => {
  return range(7).map(d => getWeekdayName(d, locale));
};
