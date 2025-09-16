import React, { MouseEventHandler } from 'react';

import { DatePickerContentProps } from '../DatePickerContent';

export interface DatePickerInputProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'>,
    Pick<DatePickerContentProps, 'onChange'> {
  /**
   * Click handler
   */
  onClick?: MouseEventHandler;
}
