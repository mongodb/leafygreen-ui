import { SegmentRefs, TimeSegment, TimeSegmentsState } from '../shared.types';
import { TimeInputSegmentChangeEventHandler } from '../TimeInputSegment/TimeInputSegment.types';

export interface TimeInputBoxProps
  extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The segments of the time input
   */
  segments: TimeSegmentsState;

  /**
   * The function to set a segment
   */
  setSegment: (segment: TimeSegment, value: string) => void;

  /**
   * The function to handle a segment change, but not necessarily a full value
   */
  onSegmentChange?: TimeInputSegmentChangeEventHandler;

  /**
   * The refs for the segments
   */
  segmentRefs: SegmentRefs;
}
