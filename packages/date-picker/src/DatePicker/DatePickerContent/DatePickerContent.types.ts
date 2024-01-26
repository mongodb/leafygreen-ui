import { ContextPropKeys } from '../../shared/context';
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
