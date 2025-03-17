import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface EmbeddedDrawerLayoutProps extends HTMLElementProps<'div'> {
  /**
   * Determines if the Drawer instance is open or closed
   */
  isDrawerOpen: boolean;
}
