import { MouseEventHandler } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DatePickerComponentProps } from '../DatePickerComponent';

export interface DatePickerInputProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'>,
    Pick<DatePickerComponentProps, 'onChange'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}
