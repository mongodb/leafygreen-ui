import { DateTimeParts } from './shared.types';

/**
 * The text for the 24 hour format
 */
export const TWENTY_FOUR_HOURS_TEXT = '24 hours';

/**
 * The minimum date for the time input. Is the current date at 00:00:00 UTC.
 */
export const MIN_DATE = new Date(
  Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
    0,
    0,
    0,
  ),
);

/**
 * The maximum date for the time input. Is the current date at 23:59:59 UTC.
 */
export const MAX_DATE = new Date(
  Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
    23,
    59,
    59,
  ),
);

/**
 * The options for the unit select
 */
export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
] as const;

/**
 * The default placeholders for each segment
 */
export const defaultPlaceholders = {
  hour: 'HH',
  minute: 'MM',
  second: 'SS',
} as const;

/**
 * The default time parts
 */
export const defaultDateTimeParts: DateTimeParts = {
  hour: '',
  minute: '',
  second: '',
  month: '',
  day: '',
  year: '',
  dayPeriod: 'AM',
};
