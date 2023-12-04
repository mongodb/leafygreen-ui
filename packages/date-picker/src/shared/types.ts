import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

export const DatePickerState = omit(FormFieldState, 'Valid');
export type DatePickerState =
  (typeof DatePickerState)[keyof typeof DatePickerState];

export type DateType = Date | null;
export type DateRangeType = [DateType, DateType];

export const AutoComplete = {
  Off: 'off',
  On: 'on',
  Bday: 'bday',
} as const;

export type AutoComplete = (typeof AutoComplete)[keyof typeof AutoComplete];

export interface BaseDatePickerProps extends DarkModeProps {
  /**
   * A label for the input
   */
  label: React.ReactNode;

  /**
   * A description for the date picker.
   *
   * It's recommended to set a meaningful time zone representation as the description (e.g. "Coordinated Universal Time")
   */
  description?: React.ReactNode;

  /**
   * Sets the _presentation format_ for the displayed date.
   * Fallback to the user’s browser preference (if supported), otherwise ISO-8601.
   *
   * Currently only the following values are officially supported.
   * Other valid [Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
   * strings may work, however no assurances are made.
   *
   * @enum 'en-US' | 'en-UK' | 'iso8601'
   *
   * @default 'iso8601'
   */
  dateFormat?: 'iso8601' | `${string}-${string}`;

  /**
   * A valid IANA timezone string, or UTC offset.
   * Sets the _presentation time zone_ for the displayed date.
   * Fallback to the user’s browser preference (if available), otherwise UTC.
   *
   * @default 'utc'
   */
  timeZone?: string;

  /** The earliest date accepted */
  min?: string | Date;

  /** The latest date accepted */
  max?: string | Date;

  /**
   * The base font size of the input. Inherits from the nearest LeafyGreenProvider
   */
  baseFontSize?: BaseFontSize;

  /**
   * Whether the input is disabled. Note: will not set the `disabled` attribute on an input and the calendar menu will not open if disabled is set to true.
   */
  disabled?: boolean;

  /** The size of the input */
  size?: Size;

  /**
   * Whether to show an error message
   */
  state?: DatePickerState;

  /**
   * A message to show in red underneath the input when state is Error
   */
  errorMessage?: string;

  /** Whether the calendar menu is initially open. Note: The calendar menu will not open if disabled is set to true.  */
  initialOpen?: boolean;

  /**
   * Whether the input should autofill
   * @default 'off'
   */
  autoComplete?: AutoComplete;
}
