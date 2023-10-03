import { DateRangePickerProps } from '../DateRangePicker.types';

export interface DateRangeInputProps
  extends Pick<DateRangePickerProps, 'start' | 'end' | 'handleValidation'> {}
