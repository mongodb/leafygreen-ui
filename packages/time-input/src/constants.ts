import { TimeSegments } from './TimeInputSegment/TimeInputSegment.types';

export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
];

export const getTimeSegmentRules = (is12HourFormat: boolean) => {
  return {
    [TimeSegments.Hour]: {
      maxChars: 2,
      minExplicitValue: is12HourFormat ? 1 : 2,
    },
    [TimeSegments.Minute]: {
      maxChars: 2,
      minExplicitValue: 6,
    },
    [TimeSegments.Second]: {
      maxChars: 2,
      minExplicitValue: 6,
    },
  };
};

/**
 * The minimum number for each segment
 */
export const getDefaultMin = (is12HourFormat: boolean) => {
  return {
    hour: is12HourFormat ? 1 : 0,
    minute: 0,
    second: 0,
  } as const;
};

/**
 * The maximum number for each segment
 */
export const defaultMax = {
  hour: 23,
  minute: 59,
  second: 59,
} as const;

/**
 * The default placeholders for each segment
 */
export const defaultPlaceholder = {
  hour: 'HH',
  minute: 'MM',
  second: 'SS',
} as const;
