import { ButtonProps } from '@leafygreen-ui/button';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { PrimaryButtonProps } from './PrimaryButton';

type CustomButtonProps = Pick<
  ButtonProps,
  'children' | 'leftGlyph' | 'onClick'
>;

export interface FormFooterProps extends HTMLElementProps<'footer'> {
  /**
   * The primary (right-most) button.
   * Defined as a `<Button>` element, or as an object with the shape:
   *
   * ```ts
   * interface PrimaryButtonProps {
   *  text: string;
   *  onClick?: React.MouseEventHandler<HTMLButtonElement>;
   *  variant?: 'primary' | 'danger';
   *  disabled?: boolean;
   *  type?: 'button' | 'submit';
   * }
   * ```
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  primaryButton: React.ReactElement | PrimaryButtonProps;

  /**
   * The cancel button which will only appear if cancelButtonProps is defined.
   * Customizable props include children, leftGlyph, and onClick.
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  cancelButtonProps?: CustomButtonProps;

  /**
   * The back button which will only appear if backButtonProps is defined.
   * Customizable props include children, leftGlyph, and onClick.
   *
   * darkMode is handled internally so you do not have to pass the darkMode prop.
   */
  backButtonProps?: CustomButtonProps;

  /**
   * Text for the cancel button.
   * A cancel button will only appear if this text is defined.
   *
   * @default "Cancel"
   * @deprecated since version 3.1.0 - use cancelButtonProps instead
   */
  cancelButtonText?: string;

  /**
   * onClick callback for the cancel button
   *
   * @deprecated since version 3.1.0 - use cancelButtonProps instead
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Text for the back button. A back button will only appear if text is defined.
   *
   * @deprecated since version 3.1.0 - use backButtonProps instead
   */
  backButtonText?: string;

  /**
   * onClick callback for the back button
   *
   * @deprecated since version 3.1.0 - use backButtonProps instead
   */
  onBackClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Text within the error banner. The banner will only appear if an error message is defined.
   */
  errorMessage?: string;

  /**
   * Styling prop for the content.
   * Useful for setting left and right margins, or max-width
   */
  contentClassName?: string;

  /**
   * Styling prop
   */
  className?: string;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   * @default false
   */
  darkMode?: boolean;
}
