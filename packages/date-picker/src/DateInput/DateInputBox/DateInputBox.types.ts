import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateSegment, DateSegmentValue } from '../../hooks/useDateSegments';
import { SegmentRefs } from '../../hooks/useSegmentRefs';
import { DateType } from '../../types';

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
  onSegmentChange?: (
    segment: DateSegment,
    segmentValue: DateSegmentValue,
  ) => void;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /** Refs  */
  segmentRefs: SegmentRefs;
}
