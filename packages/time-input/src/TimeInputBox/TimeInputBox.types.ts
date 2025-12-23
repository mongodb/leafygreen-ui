import { TimeSegment, TimeSegmentsState } from '../shared.types';

export interface TimeInputBoxProps extends React.ComponentPropsWithRef<'div'> {
  segments: TimeSegmentsState;
  setSegment: (segment: TimeSegment, value: string) => void;
}
