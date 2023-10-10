import { MouseEventHandler } from 'react';

// import { DynamicRefGetter } from '@leafygreen-ui/hooks/src/useDynamicRefs';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DatePickerComponentProps } from '../DatePickerComponent';

export interface DatePickerInputProps
  extends Pick<
      DatePickerComponentProps,
      'setValue' | 'value' | 'handleValidation' | 'onChange'
    >,
    Omit<HTMLElementProps<'div'>, 'onChange'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}
