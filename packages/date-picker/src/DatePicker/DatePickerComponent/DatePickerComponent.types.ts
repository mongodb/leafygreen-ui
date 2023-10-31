import { ContextPropKeys } from '../../shared/components/DatePickerContext';
import { useControlledValue } from '../../shared/hooks';
import { DateType } from '../../shared/types';
import { DatePickerProps } from '../DatePicker.types';

/**
 * Extends {@link DatePickerProps},
 * but omits props that are added to the context.
 * Replaces `onDateChange` with a `setValue` setter function
 */
export interface DatePickerComponentProps
  extends Omit<DatePickerProps, ContextPropKeys | 'onDateChange'> {
  setValue: ReturnType<typeof useControlledValue<DateType>>['setValue'];
}
