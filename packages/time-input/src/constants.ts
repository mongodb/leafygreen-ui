import { DateTimeParts } from './shared.types';

export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
];

export const defaultDateTimeParts: DateTimeParts = {
  hour: '',
  minute: '',
  second: '',
  month: '',
  day: '',
  year: '',
  dayPeriod: 'AM',
};
