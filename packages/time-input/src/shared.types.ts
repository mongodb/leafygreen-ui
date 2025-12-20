import { InputSegmentChangeEventHandler } from '@leafygreen-ui/input-box';
import { keyMap } from '@leafygreen-ui/lib';

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
 * The type for the time input segment change event
 */
export interface TimeInputSegmentChangeEvent {
  segment: TimeSegment;
  value: string;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

/**
 * The type for the time input segment change event handler
 */
export type TimeInputSegmentChangeEventHandler = InputSegmentChangeEventHandler<
  TimeSegment,
  string
>;
