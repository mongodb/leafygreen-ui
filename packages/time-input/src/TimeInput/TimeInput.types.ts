import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import omit from 'lodash/omit';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DateType, LocaleString } from '@leafygreen-ui/date-utils';
import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

export const State = omit(FormFieldState, 'Valid');
export type State = (typeof State)[keyof typeof State];

export { Size };

/**
 * Props that are added to the display context
 */
export type DisplayTimeInputProps = {
  /**
   * Whether to show an error message.
   *
   * @default 'none'
   */
  state?: State;

  /**
   * A description for the time input.
   */
  description?: string;

  /**
   * The size of the time input.
   *
   * @default 'default'
   */
  size?: Size;

  /**
   * Whether the time input is disabled.
   */
  disabled?: boolean;

  /**
   * Sets the _presentation format_ for the displayed time,
   * Defaults to ISO-8601.
   *
   * Currently only the following values are officially supported: 'en-US' | 'en-GB' | 'iso-8601'
   * Other valid [Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)
   * strings may work, however no assurances are made.
   *
   * @default 'iso-8601'
   */
  locale?: LocaleString;

  /**
   * A valid IANA timezone string, or UTC offset,
   * used to calculate initial values.
   * Defaults to the user’s browser settings.
   */
  timeZone?: string;

  /**
   * The earliest time accepted, in UTC
   */
  min?: Date;

  /**
   * The latest time accepted, in UTC
   */
  max?: Date;

  /**
   * The base font size of the input. Inherits from the nearest LeafyGreenProvider
   */
  baseFontSize?: BaseFontSize;

  /**
   * A message to show in red underneath the input when state is `Error`
   */
  errorMessage?: string;

  /**
   * Whether to show seconds in the input.
   *
   * @default true
   */
  showSeconds?: boolean;
} & DarkModeProps &
  AriaLabelPropsWithLabel;

/**
 * Props that are passed to the component
 */
export interface ComponentTimeInputProps
  extends LgIdProps,
    ComponentPropsWithoutRef<'div'> {
  /**
   * Callback fired when any segment changes, (but not necessarily a full value)
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Props that are used to control the value/state of the time input
 */
export interface DataTimeInputProps {
  /**
   * The selected time.
   *
   * TODO: add more details
   */
  value?: DateType;

  /**
   * The initial selected date. Ignored if `value` is provided
   *
   * See `value` prop documentation for more details
   */
  initialValue?: DateType;

  /**
   * Callback fired when the user makes a value change.
   *
   * _Not_ fired when a time segment changes, but does not create a full time
   *
   * Callback time argument will be a Date object in UTC time, or `null`
   */
  onTimeChange?: (value?: DateType) => void;

  /**
   * A callback fired when validation should run, based on [form validation guidelines](https://www.mongodb.design/foundation/forms/#form-validation-error-handling).
   * Use this callback to compute the correct `state` and `errorMessage` value.
   *
   * Callback time argument will be a Date object in UTC time, or `null`
   */
  handleValidation?: (value?: DateType) => void;
}

/**
 * All props that are passed to the TimeInput component
 */
export type TimeInputProps = DataTimeInputProps &
  DisplayTimeInputProps &
  ComponentTimeInputProps;
