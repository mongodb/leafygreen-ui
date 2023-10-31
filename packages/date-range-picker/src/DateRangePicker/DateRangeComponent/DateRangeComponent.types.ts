import { DatePickerContextProps } from '@leafygreen-ui/date-picker/shared/components/DatePickerContext';

import { DateRangeContextProps } from '../DateRangeContext/DateRangeContext.types';
import { DateRangePickerProps } from '../DateRangePicker.types';

/**
 * We pass into the component anything in
 * DateRangePickerProps that is _not_ in
 * DatePickerContext or DateRangeContext
 */
export interface DateRangeComponentProps
  extends Omit<
    DateRangePickerProps,
    keyof (DatePickerContextProps & DateRangeContextProps)
  > {}
