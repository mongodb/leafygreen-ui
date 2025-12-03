import { TimeParts, TimeSegment } from './shared.types';

/**
 * The options for the unit select
 */
export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
];

/**
 * The rules for the time segments
 *
 * @param is12HourFormat - Whether the time input is in 12-hour format
 */
export const getTimeSegmentRules = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) => {
  return {
    [TimeSegment.Hour]: {
      maxChars: 2,
      minExplicitValue: is12HourFormat ? 1 : 2,
    },
    [TimeSegment.Minute]: {
      maxChars: 2,
      minExplicitValue: 6,
    },
    [TimeSegment.Second]: {
      maxChars: 2,
      minExplicitValue: 6,
    },
  };
};

/**
 * The minimum number for each segment
 *
 * @param is12HourFormat - Whether the time input is in 12-hour format
 */
export const getDefaultMin = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) => {
  return {
    hour: is12HourFormat ? 1 : 0,
    minute: 0,
    second: 0,
  } as const;
};

/**
 * The maximum number for each segment
 *
 * @param is12HourFormat - Whether the time input is in 12-hour format
 */
export const getDefaultMax = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) => {
  return {
    hour: is12HourFormat ? 12 : 23,
    minute: 59,
    second: 59,
  } as const;
};

/**
 * The default placeholders for each segment
 */
export const defaultPlaceholder = {
  hour: 'HH',
  minute: 'MM',
  second: 'SS',
} as const;

/**
 * The default time parts
 */
export const defaultTimeParts: TimeParts = {
  hour: '',
  minute: '',
  second: '',
  month: '',
  day: '',
  year: '',
  dayPeriod: 'AM',
};
