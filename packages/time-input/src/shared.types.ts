import { InputSegmentChangeEventHandler } from '@leafygreen-ui/input-box';

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

export type DateTimePartKeysWithoutDayPeriod = Exclude<
  DateTimePartKeys,
  typeof DateTimePartKeys.dayPeriod
>;

export type DateTimeParts = Record<DateTimePartKeysWithoutDayPeriod, string> & {
  [DateTimePartKeys.dayPeriod]: DayPeriod;
};

export type DateParts = Pick<DateTimeParts, 'day' | 'month' | 'year'>;

/**
 * An enumerable object that maps the time segment names to their values
 */
export const TimeSegment = {
  Hour: 'hour',
  Minute: 'minute',
  Second: 'second',
} as const;

export type TimeSegment = (typeof TimeSegment)[keyof typeof TimeSegment];

export type TimeSegmentsState = Record<TimeSegment, string>;

/*
 * An enumerable object that maps the day period names to their values
 */
export const DayPeriod = {
  AM: 'AM',
  PM: 'PM',
} as const;

export type DayPeriod = (typeof DayPeriod)[keyof typeof DayPeriod];

/**
 * The type for the time input segment change event handler
 */
export type TimeInputSegmentChangeEventHandler = InputSegmentChangeEventHandler<
  TimeSegment,
  string
>;
