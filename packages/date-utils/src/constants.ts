/** Days in a week */
export const daysPerWeek = 7 as const;

/** Enumerates month names to the 0-indexed value */
export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

/**
 * The default earliest selectable date
 * (Unix epoch start: https://en.wikipedia.org/wiki/Unix_time)
 * */
export const MIN_DATE = new Date(Date.UTC(1970, Month.January, 1));

/**
 * The default latest selectable date
 * (Unix 32-bit rollover date: https://en.wikipedia.org/wiki/Year_2038_problem)
 */
export const MAX_DATE = new Date(Date.UTC(2038, Month.January, 19));
