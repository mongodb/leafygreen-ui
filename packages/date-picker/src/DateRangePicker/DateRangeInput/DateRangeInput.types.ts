import { DateRangePickerProps } from '../DateRangePicker.types';

export interface DateRangeInputProps
  extends Pick<
    DateRangePickerProps,
    'value' | 'onChange' | 'handleValidation'
  > {}
