import {
  TimeSegments,
  TimeSegmentsState,
} from '../TimeInputSegment/TimeInputSegment.types'; // TODO: move to a shared types

export interface TimeInputBoxProps
  extends React.ComponentPropsWithoutRef<'div'> {
  segments: TimeSegmentsState;
  setSegment: (segment: TimeSegments, value: string) => void;
}
