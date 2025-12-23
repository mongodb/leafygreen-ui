import { consoleOnce } from '@leafygreen-ui/lib';

import { DayPeriod } from '../../shared.types';

/**
 * Converts a 12 hour format hour to a 24 hour format hour
 *
 * @param hour - The hour to convert
 * @param dayPeriod - The day period to use for the conversion (AM or PM)
 * @returns The converted hour or the original hour if it is invalid
 *
 * @example
 * ```js
 * convert12hTo24h(12, 'AM'); // 0
 * convert12hTo24h(12, 'PM'); // 12
 * convert12hTo24h(1, 'AM'); // 1
 * convert12hTo24h(1, 'PM'); // 13
 * convert12hTo24h(0, 'AM'); // 0
 * convert12hTo24h(13, 'AM'); // 13
 * ```
 */
export const convert12hTo24h = (hour: number, dayPeriod: DayPeriod): number => {
  if (hour < 1 || hour > 12) {
    consoleOnce.warn(`convert12hTo24h > Invalid hour: ${hour}`);
    return hour;
  }

  if (hour === 12) {
    // 12AM -> 0:00
    // 12PM -> 12:00
    return dayPeriod === DayPeriod.AM ? 0 : 12;
  }

  // if dayPeriod is PM, return hour + 12
  if (dayPeriod === DayPeriod.PM) {
    return hour + 12;
  }

  return hour;
};
