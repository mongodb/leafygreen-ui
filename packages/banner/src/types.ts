import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

const Variant = {
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export interface BannerProps extends HTMLElementProps<'div', never> {
  /**
   * Sets the variant for the Banner
   *
   * Default: `'info'`
   */
  variant?: Variant;

  /**
   * Illustration that will replace default Icon when the prop is supplied
   */
  image?: React.ReactElement;

  /**
   * Determines whether or not the Banner is dismissible
   *
   * Default: `false`
   */
  dismissible?: boolean;

  /**
   * Callback fired when dismiss button is clicked
   *
   * Default: `() => {}`
   */
  onClose?: React.MouseEventHandler;

  /**
   * Determines whether or not the component will be rendered in dark mode.
   *
   * default: `false`
   */
  darkMode?: boolean;

  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
}
