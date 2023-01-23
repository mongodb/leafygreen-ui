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

export interface ValidationProps {
  message: string;
  state: States;
}

interface DescribedbyProps {
  ['aria-describedby']: string;
  state: States;
}

interface IgnoredProps {
  // TODO: ValidationProps
  ['aria-describedby']?: undefined;
  state?: never;
  // TODO: add validations
}

type ConditionalProps = DescribedbyProps | IgnoredProps;

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

interface BasePasswordInputProps
  extends Omit<
      ComponentPropsWithoutRef<'input'>,
      'onChange' | 'type' | AriaLabels
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

  /**
   * Determines what validations will appear.
   */
  validations: Array<ValidationProps>; //TODO: consider making conditional
}

export type PasswordInputProps = BasePasswordInputProps &
  ConditionalProps &
  AriaLabelProps;

// export type PasswordInputProps = {
//   /**
//    * The current value of the input.
//    */
//   value?: string;

//   /**
//    * Determines the font size and padding.
//    */

//   sizeVariant?: SizeVariant;

//   /**
//    * Determines whether the field is currently disabled.
//    * Default: false
//    */
//   disabled?: boolean;

//   /**
//    * Callback fired when the input value changes
//    */
//   onChange?: ChangeEventHandler<HTMLInputElement>;

//   /**
//    * Label that appears above the input.
//    */
//   label?: string;

//   /**
//    * id associated with the PasswordInput component, referenced by `<label>` with the `for` attribute.
//    */
//   id?: string;

//   /**
//    * Determines what validations will appear.
//    */
//   validations: Array<ValidationProps>;
// } & ConditionalProps &
//   AriaLabels &
//   Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'> &
//   DarkModeProps;
