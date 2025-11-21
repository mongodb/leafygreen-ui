import {
  InputSegmentChangeEventHandler,
  InputSegmentComponentProps,
} from '@leafygreen-ui/input-box';
import { keyMap } from '@leafygreen-ui/lib';

import { DateSegment, DateSegmentValue } from '../../../types';

export interface DateInputSegmentChangeEvent {
  segment: DateSegment;
  value: DateSegmentValue;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

export type DateInputSegmentChangeEventHandler = InputSegmentChangeEventHandler<
  DateSegment,
  DateSegmentValue
>;

export interface DateInputSegmentProps
  extends InputSegmentComponentProps<DateSegment> {}
