import { contextPropNames } from '../../DatePickerContext/DatePickerContext.utils';
import { useControlledValue } from '../../hooks/useControlledValue';
import { DateType } from '../../types';
import { DatePickerProps } from '../DatePicker.types';

export interface DatePickerContentsProps
  extends Omit<DatePickerProps, (typeof contextPropNames)[number]> {
  setValue: ReturnType<typeof useControlledValue<DateType>>['setValue'];
}
