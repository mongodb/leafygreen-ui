import { ChangeEvent } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

import { BaseDatePickerProps } from '../shared/types';

export type DatePickerProps = {
  /**
   * The selected date.
   *
   * Note that this Date object will be read as UTC time.
   * Providing `Date.now()` could result in the incorrect date being displayed,
   * depending on the system time zone.
   *
   * To set `value` to today, regardless of timeZone, use `setToUTCMidnight(new Date(Date.now()))`.
   *
   * e.g. `2023-12-31` at 20:00 in Los Angeles, will be `2024-01-01` at 04:00 in UTC.
   * To set the correct day (`2023-12-31`) as the DatePicker value
   * we must first convert our local timestamp to `2023-12-31` at midnight
   */
  value?: DateType;

  /**
   * Callback fired when the user makes a value change.
   * Fired on click of a new date in the menu, or on keydown if the input contains a valid date.
   *
   * _Not_ fired when a date segment changes, but does not create a full date
   *
   * Callback date argument will be a Date object in UTC time, or `null`
   */
  onDateChange?: (value?: DateType) => void;

  /**
   * The initial selected date. Ignored if `value` is provided
   *
   * Note that this Date object will be read as UTC time.
   * See `value` prop documentation for more details
   */
  initialValue?: DateType;

  /**
   * A callback fired when validation should run, based on [form validation guidelines](https://www.mongodb.design/foundation/forms/#form-validation-error-handling).
   * Use this callback to compute the correct `state` and `errorMessage` value.
   *
   * Callback date argument will be a Date object in UTC time, or `null`
   */
  handleValidation?: (value?: DateType) => void;

  /**
   * Callback fired when any segment changes, (but not necessarily a full value)
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & BaseDatePickerProps;
