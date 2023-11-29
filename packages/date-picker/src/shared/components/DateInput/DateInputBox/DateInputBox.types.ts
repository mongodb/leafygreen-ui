import { HTMLElementProps } from '@leafygreen-ui/lib';

import { SegmentRefs } from '../../../hooks';
import { DateType } from '../../../types';
import { DateInputSegmentChangeEventHandler } from '../DateInputSegment/DateInputSegment.types';

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
  setValue?: (date: DateType) => void;

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
