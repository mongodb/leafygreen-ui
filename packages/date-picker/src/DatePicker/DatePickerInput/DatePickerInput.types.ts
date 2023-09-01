import { MouseEventHandler } from 'react';

import { DateInputBoxProps } from '../../DateInput';

export interface DatePickerInputProps
  extends Pick<DateInputBoxProps, 'value' | 'setValue'> {
  onClick?: MouseEventHandler;
}
