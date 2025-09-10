import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps } from '@leafygreen-ui/lib';

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export const TimeInputState = omit(FormFieldState, 'Valid');
export type TimeInputState =
  (typeof TimeInputState)[keyof typeof TimeInputState];

export interface BaseTimeInputProps extends DarkModeProps {
  /**
   * The current state of the input.
   *
   * @default 'none'
   */
  state?: TimeInputState;

  /**
   * The current value of the input. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * Callback fired when the input value changes
   */
  onTimeChange?: (value: string) => void;

  /**
   * id associated with the PasswordInput component, referenced by `<label>` with the `for` attribute.
   */
  id?: string;

  /**
   * Text shown in bold above the input element.
   *
   * Optional if `aria-labelledby` is provided
   */
  label?: React.ReactNode;

  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: string;

  /**
   * Determines the font size and padding.
   *
   * @default 'default'
   */
  size?: Size;

  disabled?: boolean;

  className?: string;
}

export interface TimeInputProps extends BaseTimeInputProps {}
