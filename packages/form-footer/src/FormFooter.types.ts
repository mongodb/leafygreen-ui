import React from 'react';

import {
  BaseButtonProps,
  type Variant as ButtonVariant,
} from '@leafygreen-ui/button';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import {
  type InternalSplitButtonProps,
  type Variant as SplitButtonVariant,
} from '@leafygreen-ui/split-button';

type ButtonPropsOmittingVariant = Omit<BaseButtonProps, 'variant'>;
type ButtonPropsWithRequiredChildren = Required<
  Pick<BaseButtonProps, 'children'>
>;

type OmittedSplitButtonProps = Omit<
  InternalSplitButtonProps,
  'children' | 'variant'
>;

type BackStandardButtonProps = ButtonPropsOmittingVariant & {
  variant?: Extract<ButtonVariant, 'default' | 'dangerOutline'>;
};
type BackSplitButtonProps = OmittedSplitButtonProps & {
  variant?: Extract<SplitButtonVariant, 'default' | 'danger'>;
};
type BackButtonProps = BackStandardButtonProps | BackSplitButtonProps;

type CancelStandardButtonProps = ButtonPropsOmittingVariant;
type CancelSplitButtonProps = OmittedSplitButtonProps;
type CancelButtonProps = CancelStandardButtonProps | CancelSplitButtonProps;

type PrimaryStandardButtonProps = ButtonPropsOmittingVariant &
  ButtonPropsWithRequiredChildren & {
    variant?: Extract<ButtonVariant, 'primary' | 'danger'>;
  };
type PrimarySplitButtonProps = OmittedSplitButtonProps & {
  variant?: Extract<SplitButtonVariant, 'primary' | 'danger'>;
};
type PrimaryButtonProps = PrimaryStandardButtonProps | PrimarySplitButtonProps;

export interface FormFooterProps
  extends React.ComponentProps<'footer'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The back button, the left-most button, will only appear if backButtonProps is defined.
   * An object that accepts one of the following:
   * - `Button` props but `variant` is limited to `'default'` and `'dangerOutline'`
   * - `SplitButton` props but `variant` is limited to `'default'` and `'danger'`
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  backButtonProps?: BackButtonProps;

  /**
   * The cancel button, to the left of the primary button, will only appear if cancelButtonProps is defined.
   * An object that accepts one of the following:
   * - `Button` props except for the `variant` prop. The variant is `'default'`.
   * - `SplitButton` props except for the `variant` prop. The variant is `'default'`.
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  cancelButtonProps?: CancelButtonProps;

  /**
   * Styling prop for the first child <div> of <footer>
   * Useful for setting left and right margins, or max-width
   */
  contentClassName?: string;

  /**
   * Text within the error banner. The banner will only appear if an error message is defined.
   */
  errorMessage?: string;

  /**
   * The primary (right-most) button.
   * An object that accepts one of the following:
   * - `Button` props but `variant` is limited to `'primary'` and `'danger'`
   * - `SplitButton` props but `variant` is limited to `'primary'` and `'danger'`
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  primaryButtonProps: PrimaryButtonProps;
}
