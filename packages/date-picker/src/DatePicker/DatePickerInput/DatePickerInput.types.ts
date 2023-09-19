import { MouseEventHandler } from 'react';

import { DynamicRefGetter } from '@leafygreen-ui/hooks/src/useDynamicRefs';

import { DateInputBoxProps } from '../../DateInput';
import { DateSegment } from '../../DateInput/DateInput.types';

export interface DatePickerInputProps
  extends Pick<DateInputBoxProps, 'value' | 'setValue'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;

  segmentRefs: Record<
    DateSegment,
    ReturnType<DynamicRefGetter<HTMLInputElement>>
  >;
}
