import React, { MouseEventHandler } from 'react';

import { DatePickerContentProps } from '../DatePickerContent';

export interface DatePickerInputProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    Pick<DatePickerContentProps, 'onChange'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}
