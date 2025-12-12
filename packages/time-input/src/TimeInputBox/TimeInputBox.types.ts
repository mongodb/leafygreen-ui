import { TimeSegment, TimeSegmentsState } from '../shared.types';

export interface TimeInputBoxProps
  extends React.ComponentPropsWithoutRef<'div'> {
  segments: TimeSegmentsState;
  setSegment: (segment: TimeSegment, value: string) => void;
}
