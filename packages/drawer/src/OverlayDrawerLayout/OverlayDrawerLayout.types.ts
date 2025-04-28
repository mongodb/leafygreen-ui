import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface OverlayDrawerLayoutProps extends HTMLElementProps<'div'> {
  /**
   * Determines if the Drawer instance is open or closed
   */
  isDrawerOpen: boolean;

  /**
   * Determines if the Toolbar is present in the layout
   */
  hasToolbar?: boolean;
}
