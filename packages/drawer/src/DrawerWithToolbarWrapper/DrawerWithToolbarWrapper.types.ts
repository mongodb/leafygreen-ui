import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface DrawerWithToolbarWrapperProps extends HTMLElementProps<'div'> {
  /**
   * Determines if the Drawer instance is open or closed
   */
  isDrawerOpen: boolean;
}
