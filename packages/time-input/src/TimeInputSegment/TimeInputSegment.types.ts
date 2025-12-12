import {
  InputSegmentChangeEventHandler,
  InputSegmentComponentProps,
} from '@leafygreen-ui/input-box';
import { keyMap } from '@leafygreen-ui/lib';

import { TimeSegment } from '../shared.types';

export interface TimeInputSegmentChangeEvent {
  segment: TimeSegment;
  value: string;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

export type TimeInputSegmentChangeEventHandler = InputSegmentChangeEventHandler<
  TimeSegment,
  string
>;

export interface TimeInputSegmentProps
  extends InputSegmentComponentProps<TimeSegment> {}
