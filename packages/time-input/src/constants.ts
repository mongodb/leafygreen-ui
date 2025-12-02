import { TimeSegments } from './TimeInputSegment/TimeInputSegment.types';

export const unitOptions = [
  { displayName: 'AM', value: 'AM' },
  { displayName: 'PM', value: 'PM' },
];

export const timeSegmentRules = {
  [TimeSegments.Hour]: {
    maxChars: 2,
    minExplicitValue: 2, // TODO: this depends on 12/24h format
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

/**
 * The minimum number for each segment
 */
export const defaultMin = {
  hour: 0, // TODO: this depends on 12/24h format
  minute: 0,
  second: 0,
} as const;

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
};

/**
 * The number of characters per input segment
 */
export const charsPerSegment = {
  day: 2,
  month: 2,
  year: 4,
};
