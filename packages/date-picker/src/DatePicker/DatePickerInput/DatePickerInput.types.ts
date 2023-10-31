import { MouseEventHandler } from 'react';

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
