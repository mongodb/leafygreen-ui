import { Variant } from '@leafygreen-ui/banner';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface MessageBannerProps
  extends HTMLElementProps<'div', never>,
    DarkModeProps {
  /**
   * Determines the color and glyph of the MessageBanner.
   * @default Variant.Info
   */
  variant?: Variant;

  /**
   * The content inside of the MessageBanner.
   */
  children: React.ReactNode;
}
