export const DateTimePartKeys = {
  hour: 'hour',
  minute: 'minute',
  second: 'second',
  month: 'month',
  day: 'day',
  year: 'year',
  dayPeriod: 'dayPeriod',
} as const;

export type DateTimePartKeys =
  (typeof DateTimePartKeys)[keyof typeof DateTimePartKeys];

export type DateTimeParts = Record<DateTimePartKeys, string>;
