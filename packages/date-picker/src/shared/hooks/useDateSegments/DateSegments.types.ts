export const DateSegment = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;
export type DateSegment = (typeof DateSegment)[keyof typeof DateSegment];

export type DateSegmentValue = string;

export type DateSegmentsState = Record<DateSegment, DateSegmentValue>;

export function isDateSegment(str: any): str is DateSegment {
  if (typeof str !== 'string') return false;
  return ['day', 'month', 'year'].includes(str);
}

/** Callback passed into the hook, called when any segment updates */
export type OnUpdateCallback = (
  value: DateSegmentsState,
  previous?: DateSegmentsState,
  updatedSegment?: DateSegment,
) => void;

export interface UseDateSegmentsOptions {
  /** A callback fired when the segment values change */
  onUpdate?: OnUpdateCallback;
}

export type SetSegmentCallback = (
  segment: DateSegment,
  value: DateSegmentValue,
) => void;
export interface UseDateSegmentsReturnValue {
  segments: DateSegmentsState;
  setSegment: SetSegmentCallback;
}
