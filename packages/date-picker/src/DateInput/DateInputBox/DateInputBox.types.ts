import { ChangeEventHandler } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

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
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /** Refs  */
  segmentRefs: SegmentRefs;
}
