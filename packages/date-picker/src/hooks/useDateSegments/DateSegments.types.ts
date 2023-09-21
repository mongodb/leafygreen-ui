export const DateSegment = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;
export type DateSegment = (typeof DateSegment)[keyof typeof DateSegment];

export type DateSegmentValue = number;

export type DateSegmentsState = Record<
  DateSegment,
  DateSegmentValue | undefined
>;

export function isDateSegment(str: string): str is DateSegment {
  return ['day', 'month', 'year'].includes(str);
}

export type OnUpdateCallback = (value: DateSegmentsState) => void;

export interface UseDateSegmentsOptions {
  /** A formatter used to separate the date value into segments */
  // timeZone: string;

  /** A callback fired when the segment values change */
  onUpdate?: OnUpdateCallback;
}

export interface UseDateSegmentsReturnValue {
  segments: DateSegmentsState;
  setSegment: (segment: DateSegment, value: DateSegmentValue) => void;
}
