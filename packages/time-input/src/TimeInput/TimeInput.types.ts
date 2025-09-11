import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { ChangeEvent } from 'react';

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

export interface BaseTimeInputProps extends DarkModeProps, LgIdProps {
  /**
   * The current state of the input.
   *
   * @default 'none'
   */
  state?: TimeInputState;


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

export type TimeInputProps =  {
  /**
     * The selected time.
     * // TODO: add more details
     */
  value?: string;

  /**
   * Callback fired when the user makes a value change.
   * // TODO: add more details
   */
  onTimeChange?: (value: string) => void;

  handleValidation?: (value: string) => void;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & BaseTimeInputProps;
