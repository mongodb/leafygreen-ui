import { TimeParts } from './shared.types';

export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
];

export const defaultTimeParts: TimeParts = {
  hour: '',
  minute: '',
  second: '',
  month: '',
  day: '',
  year: '',
  dayPeriod: 'AM',
};
