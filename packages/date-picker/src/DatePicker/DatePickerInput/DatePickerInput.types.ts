import { MouseEventHandler } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DatePickerContentProps } from '../DatePickerContent';

export interface DatePickerInputProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'>,
    Pick<DatePickerContentProps, 'onChange'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}
