import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export const State = {
  Error: 'error', // red x icon, red text
  Warning: 'warning', // red warning icon, red text
  Valid: 'valid', // green checkmark, black text
  None: 'none', // gray checkmark, gray text
} as const;

export type State = (typeof State)[keyof typeof State];

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export interface NotificationProps {
  notification?: string;
  state: State;
}

type AriaLabelkeys = keyof AriaLabelPropsWithLabel;

// Using custom notification container with aria-describedby
interface CustomNotificationProps {
  /**
   * The id reference to the custom notification container
   */
  ['aria-describedby']: string;

  /**
   * Determines what notifications will appear
   *
   * @default 'none'
   */
  stateNotifications: State;
}

// Using general notification container, no aria-describedby
interface GeneralNotificationProps {
  /**
   * The id reference to the custom notification container
   */
  ['aria-describedby']?: never;

  /**
   * Determines what notifications will appear
   *
   * @default 'none'
   */
  stateNotifications: State;
}

// Using many notifications container, no aria-describedby
interface StateAndNotificationProps {
  /**
   * The id reference to the custom notification container
   */
  ['aria-describedby']?: never;

  /**
   * Determines what notifications will appear
   *
   * @default []
   */
  stateNotifications?: Array<NotificationProps>;
}

export type StateNotificationProps =
  | CustomNotificationProps
  | GeneralNotificationProps
  | StateAndNotificationProps;

type ConditionalProps = AriaLabelPropsWithLabel & StateNotificationProps;

interface BasePasswordInputProps
  extends Omit<
      ComponentPropsWithoutRef<'input'>,
      'onChange' | 'type' | AriaLabelkeys | 'aria-describedby' | 'size'
    >,
    DarkModeProps,
    LgIdProps {
  /**
   * The current value of the input.
   */
  value?: string;

  /**
   * Determines the font size and padding.
   */

  size?: Size;

  /**
   * Callback fired when the input value changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * id associated with the PasswordInput component, referenced by `<label>` with the `for` attribute.
   */
  id?: string;

  /**
   * The message shown below the input when state is `error`
   */
  errorMessage?: React.ReactNode;

  /**
   * The message shown below the input when state is `valid`
   */
  successMessage?: React.ReactNode;
}

export type PasswordInputProps = BasePasswordInputProps & ConditionalProps;
