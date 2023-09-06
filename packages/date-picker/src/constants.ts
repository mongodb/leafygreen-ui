import { range } from 'lodash';

import { getMonthName } from './utils/getMonthName';

// Compute the long & short form of each month index
export const Months: Array<{
  long: string;
  short: string;
}> = range(12).map(m => getMonthName(m));

/** Maps the month name to its index */
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

export const daysPerWeek = 7 as const;

export const DaysOfWeek = [
  { long: 'Sunday', short: 'su' },
  { long: 'Monday', short: 'mo' },
  { long: 'Tuesday', short: 'tu' },
  { long: 'Wednesday', short: 'we' },
  { long: 'Thursday', short: 'th' },
  { long: 'Friday', short: 'fr' },
  { long: 'Saturday', short: 'sa' },
] as const;

export type DaysOfWeek = (typeof DaysOfWeek)[number];
