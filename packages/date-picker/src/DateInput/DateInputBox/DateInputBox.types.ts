import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateSegment, DateSegmentValue } from '../DateInputSegment';

export interface DateInputBoxProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'> {
  /**
   * Date value passed into the component, in UTC time
   */
  value: Date | null;

  /**
   * Value setter callback.
   * Date object is in UTC time
   */
  setValue?: (date: Date | null) => void;

  /**
   * id of the labelling element
   */
  labelledBy?: string;
}

export type DateSegmentsState = Record<
  DateSegment,
  DateSegmentValue | undefined
>;
