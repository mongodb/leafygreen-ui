export const TimePartKeys = {
  hour: 'hour',
  minute: 'minute',
  second: 'second',
  month: 'month',
  day: 'day',
  year: 'year',
  dayPeriod: 'dayPeriod',
} as const;

export type TimePartKeys = (typeof TimePartKeys)[keyof typeof TimePartKeys];

export type TimeParts = Record<TimePartKeys, string>;
