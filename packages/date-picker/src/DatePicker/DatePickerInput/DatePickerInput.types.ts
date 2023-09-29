import { MouseEventHandler } from 'react';

// import { DynamicRefGetter } from '@leafygreen-ui/hooks/src/useDynamicRefs';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateInputBoxProps } from '../../DateInput';
// import { DateSegment } from '../../hooks/useDateSegments/DateSegments.types';
import { DatePickerProps } from '../DatePicker.types';

export interface DatePickerInputProps
  extends Pick<DateInputBoxProps, 'value' | 'setValue' | 'onSegmentChange'>,
    Pick<DatePickerProps, 'handleValidation'>,
    HTMLElementProps<'div'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}
