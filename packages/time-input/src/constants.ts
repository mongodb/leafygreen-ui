import { DateTimeParts } from './shared.types';

/**
 * The options for the unit select
 */
export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
];

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
