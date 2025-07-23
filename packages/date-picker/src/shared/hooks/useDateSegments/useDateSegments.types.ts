import { DateSegment, DateSegmentsState, DateSegmentValue } from '../../types';

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
