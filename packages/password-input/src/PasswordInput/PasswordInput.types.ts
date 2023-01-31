import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const States = {
  Error: 'error', // red x icon, red text
  Warning: 'warning', // red warning icon, red text
  Valid: 'valid', // green checkmark, black text
  None: 'none', // gray checkmark, gray text
} as const;

export type States = typeof States[keyof typeof States];

export const SizeVariant = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type SizeVariant = typeof SizeVariant[keyof typeof SizeVariant];

export interface MessageProps {
  message?: string;
  state: States;
}

// TODO: check this
interface AriaLabelProps {
  /**
   * Text shown in bold above the input element.
   *
   * Optional if `aria-labelledby` or `aria-label` is provided
   */
  label?: string;

  /**
   * Screen-reader label element.
   *
   * Optional if `label` or `aria-label` is provided
   */
  ['aria-labelledby']?: string;

  /**
   * Screen reader label text
   *
   * Optional if `label` or `aria-labelledby` is provided
   *
   */
  ['aria-label']?: string;
}

type AriaLabels = keyof AriaLabelProps;

// Using custom message container with aria-describedby
interface StateOnlyProps {
  /**
   *
   */
  ['aria-describedby']: string;

  /**
   * Determines what messages will appear
   */
  stateNotifications: States;
}

// using default message container, no aria-describedby
interface StateAndMessageProps {
  /**
   *
   */
  ['aria-describedby']?: never;

  /**
   * Determines what messages will appear
   */
  stateNotifications?: Array<MessageProps>;
}

export type StateNotificationProps = StateAndMessageProps | StateOnlyProps;

interface BasePasswordInputProps
  extends Omit<
      ComponentPropsWithoutRef<'input'>,
      'onChange' | 'type' | AriaLabels | 'aria-describedby'
    >,
    DarkModeProps {
  /**
   * The current value of the input.
   */
  value?: string;

  /**
   * Determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   * Determines whether the field is currently disabled.
   * Default: false
   */
  disabled?: boolean;

  /**
   * Callback fired when the input value changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Label that appears above the input.
   */
  label?: string;

  /**
   * id associated with the PasswordInput component, referenced by `<label>` with the `for` attribute.
   */
  id?: string;
}

export type PasswordInputProps = BasePasswordInputProps &
  StateNotificationProps &
  AriaLabelProps;
