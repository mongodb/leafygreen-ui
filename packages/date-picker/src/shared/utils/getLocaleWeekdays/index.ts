import range from 'lodash/range';

import { getWeekdayName } from '../getWeekdayName';

/**
 * Returns an array of weekdays for the provided locale.
 * Defaults to system locale
 */
export const getLocaleWeekdays = (locale?: string) => {
  return range(7).map(d => getWeekdayName(d, locale));
};
