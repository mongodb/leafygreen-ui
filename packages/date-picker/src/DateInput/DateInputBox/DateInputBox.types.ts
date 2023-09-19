import { DynamicRefGetter } from '@leafygreen-ui/hooks/src/useDynamicRefs';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateType } from '../../types';
import { DateSegment } from '../DateInput.types';

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
   * id of the labelling element
   */
  labelledBy?: string;

  /** Refs  */
  segmentRefs: Record<
    DateSegment,
    ReturnType<DynamicRefGetter<HTMLInputElement>>
  >;
}
