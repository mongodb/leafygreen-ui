import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

const Size = {
  xsmall: 'xsmall',
  small: 'small',
  default: 'default',
  large: 'large',
};
type Size = typeof Size[keyof typeof Size];

export interface BaseDatePickerProps extends DarkModeProps {
  /**
   * A label for the input
   */
  label: string;

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
  dateFormat?: string;

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
   * Whether the input is disabled. Note: will not set the `disabled` attribute on an input
   */
  disabled?: boolean;

  /** The size of the input */
  size?: Size;

  /**
   * Whether to show an error message
   */
  state?: 'unset' | 'error';

  /**
   * A message to show in red underneath the input when in an error state
   */
  errorMessage?: string;
}
