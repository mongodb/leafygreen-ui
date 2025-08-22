import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const Variant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export interface BannerProps
  extends HTMLElementProps<'div', never>,
    DarkModeProps {
  /**
   * Sets the variant for the Banner
   *
   * @default 'info'
   */
  variant?: Variant;

  /**
   * Illustration that will replace default Icon when the prop is supplied
   */
  image?: React.ReactElement;

  /**
   * Determines whether or not the Banner is dismissible
   *
   * @default `false`
   */
  dismissible?: boolean;

  /**
   * Callback fired when dismiss button is clicked
   *
   * @default `() => {}`
   */
  onClose?: React.MouseEventHandler;

  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
}
