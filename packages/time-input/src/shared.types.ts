import { DynamicRefGetter } from '@leafygreen-ui/hooks';

/**
 * An enumerable object that maps the time part names to their values
 */
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

/**
 * An object that maps the time segment names to their refs
 */
export type SegmentRefs = Record<
  TimeSegment,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;
