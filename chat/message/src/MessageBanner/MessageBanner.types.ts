import { Variant } from '@leafygreen-ui/banner';
import { DarkModeProps } from '@leafygreen-ui/lib';

export interface MessageBannerProps extends DarkModeProps {
  /**
   * Determines the color and glyph of the MessageBanner.
   * @default Variant.Info
   */
  variant?: Variant;

  /**
   * The content inside of the MessageBanner.
   */
  children: React.ReactNode | Array<React.ReactNode>;
}
