import { BaseDatePickerProps } from '../types';

export interface DatePickerProps extends BaseDatePickerProps {
  /** The initial selected date. Ignored if `value` is provided */
  initialValue: string | Date;

  /** The selected date */
  value: string | Date;

  /**
   * A Callback fired when the user makes a value change.
   * Fired on click of a new date in the menu, or on keydown if the input contains a valid date
   *
   * Callback date argument will be a Date object in ISO-8601 format, and in UTC time.
   */
  onChange: (value: Date) => void;

  /**
   * A callback fired when validation should run, based on our [form validation guidelines](https://www.mongodb.design/foundation/forms/#form-validation-error-handling).
   * Use this callback to compute the correct `state` value.
   *
   * Callback date argument will be a Date object in ISO 8601 format, and in UTC time.
   */
  handleValidation: (value: Date) => void;
}
