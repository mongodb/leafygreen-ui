import { DateSegment, DateSegmentValue } from '../hooks/useDateSegments';
import { BaseDatePickerProps, DateType } from '../types';

export interface DatePickerProps extends BaseDatePickerProps {
  /**
   * The selected date, given in UTC time
   */
  value?: DateType;

  /**
   * Callback fired when the user makes a value change.
   * Fired on click of a new date in the menu, or on keydown if the input contains a valid date.
   *
   * _Not_ fired when a date segment changes, but does not create a full date
   *
   * Callback date argument will be a Date object in ISO-8601 format, and in UTC time.
   */
  onDateChange?: (value?: DateType) => void;

  /** The initial selected date. Ignored if `value` is provided */
  initialValue?: DateType;

  /**
   * A callback fired when validation should run, based on our [form validation guidelines](https://www.mongodb.design/foundation/forms/#form-validation-error-handling).
   * Use this callback to compute the correct `state` value.
   *
   * Callback date argument will be a Date object in ISO 8601 format, and in UTC time.
   */
  handleValidation?: (value?: DateType) => void;

  /**
   * Callback fired when any segment changes, but not necessarily a full value
   */
  onSegmentChange?: (
    segment: DateSegment,
    segmentValue: DateSegmentValue,
  ) => void;
}
