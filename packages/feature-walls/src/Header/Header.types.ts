import { ButtonProps } from '@leafygreen-ui/button';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

type ButtonPropsOmittingVariantWithRequired = Omit<ButtonProps, 'variant'> & {
  children: React.ReactNode;
};

export interface HeaderProps extends HTMLElementProps<'div'>, DarkModeProps {
  /**
   * Required title text
   */
  title: string;

  /**
   * Optional subtitle text that renders above the title
   */
  subtitle?: string;

  /**
   * Optional description text that renders below the title
   */
  description?: React.ReactNode;

  /**
   * An object that accepts all `Button` props but `variant` prop is limited to `primary`
   * If `secondaryButtonProps` is `undefined`, this button will be center aligned
   *
   * darkMode is handled internally so you do not have to pass the `darkMode` prop.
   */
  primaryButtonProps: ButtonPropsOmittingVariantWithRequired;

  /**
   * An object that accepts all `Button` props but `variant` is limited to `default`
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  secondaryButtonProps?: ButtonPropsOmittingVariantWithRequired;
}
