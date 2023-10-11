import { contextPropNames } from '../../DatePickerContext';
import { useControlledValue } from '../../hooks/useControlledValue';
import { DateRangeType } from '../../types';
import { DateRangePickerProps } from '../DateRangePicker.types';

export interface DateRangeComponentProps
  extends Omit<
    DateRangePickerProps,
    (typeof contextPropNames)[number] | 'onRangeChange'
  > {
  setValue: ReturnType<typeof useControlledValue<DateRangeType>>['setValue'];
}
