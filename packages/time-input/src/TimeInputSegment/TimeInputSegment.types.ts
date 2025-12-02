import {
  InputSegmentChangeEventHandler,
  InputSegmentComponentProps,
} from '@leafygreen-ui/input-box';
import { keyMap } from '@leafygreen-ui/lib';

export const TimeSegments = {
  Hour: 'hour',
  Minute: 'minute',
  Second: 'second',
} as const;

export type TimeSegments = (typeof TimeSegments)[keyof typeof TimeSegments];

export type TimeSegmentsState = Record<TimeSegments, string>;

export interface DateInputSegmentChangeEvent {
  segment: TimeSegments;
  value: string;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

export type DateInputSegmentChangeEventHandler = InputSegmentChangeEventHandler<
  TimeSegments,
  string
>;

export interface TimeInputSegmentProps
  extends InputSegmentComponentProps<TimeSegments> {}
