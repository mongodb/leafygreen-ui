import { DateRangeComponentProps } from '../DateRangeComponent';

export interface DateRangeInputProps
  extends Pick<
    DateRangeComponentProps,
    'value' | 'setValue' | 'handleValidation'
  > {}
