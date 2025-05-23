import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface OverlayDrawerLayoutProps extends HTMLElementProps<'div'> {
  /**
   * Determines if the Toolbar is present in the layout
   */
  hasToolbar?: boolean;
}
