import { DateType } from '@leafygreen-ui/date-utils';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { SegmentRefs } from '../../../hooks';
import { DateSegmentsState } from '../../../types';
import { DateInputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

export interface DateInputChangeEvent {
  value: DateType;
  segments: DateSegmentsState;
}

export type DateInputChangeEventHandler = (
  changeEvent: DateInputChangeEvent,
) => void;

export interface DateInputBoxProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'> {
  /**
   * Date value passed into the component, in UTC time
   */
  value?: DateType;

  /**
   * Value setter callback.
   * Date object is in UTC time
   */
  setValue?: DateInputChangeEventHandler;

  /**
   * Callback fired when any segment changes, but not necessarily a full value
   */
  onSegmentChange?: DateInputSegmentChangeEventHandler;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /** Refs  */
  segmentRefs: SegmentRefs;
}
