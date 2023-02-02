import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { DarkModeProps, Either } from '@leafygreen-ui/lib';

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

export interface NotificationProps {
  notification?: string;
  state: States;
}

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

type AriaLabelkeys = keyof AriaLabelProps;

type LabelProps = Either<AriaLabelProps, AriaLabelkeys>;

// Using custom notification container with aria-describedby
interface StateOnlyProps {
  /**
   * The id reference to the custom notification container
   */
  ['aria-describedby']: string;

  /**
   * Determines what notifications will appear
   *
   * @default 'none'
   */
  stateNotifications: States;
}

// using default notification container, no aria-describedby
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

export type StateNotificationProps = StateAndNotificationProps | StateOnlyProps;

type ConditionalProps = LabelProps & StateNotificationProps;

interface BasePasswordInputProps
  extends Omit<
      ComponentPropsWithoutRef<'input'>,
      'onChange' | 'type' | AriaLabelkeys | 'aria-describedby'
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
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback fired when the input value changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * id associated with the PasswordInput component, referenced by `<label>` with the `for` attribute.
   */
  id?: string;
}

export type PasswordInputProps = BasePasswordInputProps & ConditionalProps;
