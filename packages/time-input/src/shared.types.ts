import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { InputSegmentChangeEventHandler } from '@leafygreen-ui/input-box';
import { keyMap } from '@leafygreen-ui/lib';

import { unitOptions } from './constants';

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
 * An enumerable object that maps the date and time segment names to their values
 */
export const DateTimePartKeys = {
  ...TimeSegment,
  Month: 'month',
  Day: 'day',
  Year: 'year',
  DayPeriod: 'dayPeriod',
} as const;

export type DateTimePartKeys =
  (typeof DateTimePartKeys)[keyof typeof DateTimePartKeys];

export type DateTimePartKeysWithoutDayPeriod = Exclude<
  DateTimePartKeys,
  typeof DateTimePartKeys.DayPeriod
>;

export type DateTimeParts = Record<DateTimePartKeysWithoutDayPeriod, string> & {
  [DateTimePartKeys.DayPeriod]: DayPeriod;
};

export type DateParts = Pick<DateTimeParts, 'day' | 'month' | 'year'>;

/**
 * The type for the time input segment change event handler
 */
export type TimeInputSegmentChangeEventHandler = InputSegmentChangeEventHandler<
  TimeSegment,
  string
>;

/*
 * An enumerable object that maps the day period names to their values
 */
export const DayPeriod = {
  AM: 'AM',
  PM: 'PM',
} as const;

export type DayPeriod = (typeof DayPeriod)[keyof typeof DayPeriod];

/**
 * The type for the unit options
 */
export type UnitOptions = typeof unitOptions;

/**
 * The type for the unit option
 */
export type UnitOption = (typeof unitOptions)[number];

/**
 * An object that maps the time segment names to their refs
 */
export type SegmentRefs = Record<
  TimeSegment,
  ReturnType<DynamicRefGetter<HTMLInputElement>>
>;

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
