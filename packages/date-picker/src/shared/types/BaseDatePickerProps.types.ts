import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { LocaleString } from '@leafygreen-ui/date-utils';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { AutoComplete, DatePickerState } from './types';

export type ModifiedPopoverProps = Omit<
  PopoverProps,
  'usePortal' | 'refEl' | 'children' | 'className' | 'active' | 'onClick'
>;

export type BaseDatePickerProps = {
  /**
   * A description for the date picker.
   *
   * It's recommended to set a meaningful time zone representation as the description
   * (e.g. "Coordinated Universal Time")
   */
  description?: React.ReactNode;

  /**
   * Sets the _presentation format_ for the displayed date,
   * and localizes month & weekday labels.
   * Defaults to the user’s browser preference (if available),
   * otherwise ISO-8601.
   *
   * Currently only the following values are officially supported: 'en-US' | 'en-GB' | 'iso8601'
   * Other valid [Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
   * strings may work, however no assurances are made.
   *
   * @default 'iso8601'
   */
  locale?: LocaleString;

  /**
   * A valid IANA timezone string, or UTC offset,
   * used to calculate initial values.
   * Defaults to the user’s browser settings.
   */
  timeZone?: string;

  /**
   * The earliest date accepted, in UTC
   */
  min?: Date;

  /**
   * The latest date accepted, in UTC
   */
  max?: Date;

  /**
   * The base font size of the input. Inherits from the nearest LeafyGreenProvider
   */
  baseFontSize?: BaseFontSize;

  /**
   * Whether the input is disabled. Note: will not set the `disabled` attribute on an input and the calendar menu will not open if disabled is set to true.
   */
  disabled?: boolean;

  /**
   * The size of the input
   *
   * @default 'default'
   */
  size?: Size;

  /**
   * Whether to show an error message
   *
   * @default 'none'
   */
  state?: DatePickerState;

  /**
   * A message to show in red underneath the input when state is `Error`
   */
  errorMessage?: string;

  /**
   * Whether the calendar menu is initially open.
   * Note: The calendar menu will not open if disabled is set to `true`.
   */
  initialOpen?: boolean;

  /**
   * Whether the input should autofill
   * @default 'off'
   */
  autoComplete?: AutoComplete;
} & DarkModeProps &
  AriaLabelPropsWithLabel &
  ModifiedPopoverProps;
