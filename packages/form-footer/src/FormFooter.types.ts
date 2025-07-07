import { BaseButtonProps, type Variant } from '@leafygreen-ui/button';
import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

type ButtonPropsOmittingVariant = Omit<BaseButtonProps, 'variant'>;
type ButtonPropsWithRequiredChildren = Required<
  Pick<BaseButtonProps, 'children'>
>;

export type CustomCancelButtonProps = ButtonPropsOmittingVariant;
export type CustomBackButtonProps = ButtonPropsOmittingVariant & {
  variant?: Extract<Variant, 'default' | 'dangerOutline'>;
};
export type CustomPrimaryButtonProps = ButtonPropsOmittingVariant &
  ButtonPropsWithRequiredChildren & {
    variant?: Extract<Variant, 'primary' | 'danger'>;
  };

export interface FormFooterProps
  extends HTMLElementProps<'footer'>,
    DarkModeProps,
    LgIdProps {
  /**
   * The primary (right-most) button.
   * An object that accepts all `Button` props but `variant` is limited to `primary` and `danger`
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  primaryButtonProps?: CustomPrimaryButtonProps;

  /**
   * The cancel button, to the left of the primary button, will only appear if cancelButtonProps is defined.
   * An object that accepts all `Button` props except for the `variant` prop. The variant is `default`.
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  cancelButtonProps?: CustomCancelButtonProps;

  /**
   * The back button, the left-most button, will only appear if backButtonProps is defined.
   * An object that accepts all `Button` props but `variant` is limited to `default` and `dangerOutline`
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  backButtonProps?: CustomBackButtonProps;

  /**
   * Text within the error banner. The banner will only appear if an error message is defined.
   */
  errorMessage?: string;

  /**
   * Styling prop for the first child <div> of <footer>
   * Useful for setting left and right margins, or max-width
   */
  contentClassName?: string;
}
