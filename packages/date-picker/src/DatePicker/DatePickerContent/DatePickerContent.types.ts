import { ContextPropKeys } from '../../shared/components/DatePickerContext';
import { DatePickerProps } from '../DatePicker.types';

/**
 * Extends {@link DatePickerProps},
 * but omits props that are added to the context.
 * Replaces `onDateChange` with a `setValue` setter function
 */
export interface DatePickerContentProps
  extends Omit<
    DatePickerProps,
    ContextPropKeys | 'value' | 'handleValidation' | 'onDateChange'
  > {}
