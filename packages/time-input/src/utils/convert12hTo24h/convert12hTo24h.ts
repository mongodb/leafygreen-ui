/**
 * Converts a 12 hour format hour to a 24 hour format hour
 *
 * @example
 * ```js
 * convert12hTo24h('12', 'AM'); // '0'
 * convert12hTo24h('12', 'PM'); // '12'
 * convert12hTo24h('1', 'AM'); // '1'
 * convert12hTo24h('1', 'PM'); // '13'
 * ```
 *
 * @param hour - The hour to convert
 * @param dayPeriod - The day period to use for the conversion (AM or PM)
 * @returns The converted hour
 */
export const convert12hTo24h = (hour: string, dayPeriod: string) => {
  if (hour === '') return hour;

  // if dayPeriod is AM and hour is 12, return 0 since 12 AM is 00:00
  if (dayPeriod === 'AM') {
    if (hour === '12') {
      return '0';
    }

    // else return hour as-is
    return hour;
  }

  // if dayPeriod is PM and hour is 12, return 12 since 12 PM is 12:00
  if (hour === '12') {
    return '12';
  }

  // else return hour + 12
  return `${parseInt(hour) + 12}`;
};
