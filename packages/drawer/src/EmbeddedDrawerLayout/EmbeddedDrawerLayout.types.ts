import { HTMLElementProps } from '@leafygreen-ui/lib';
import { DrawerProps } from '../Drawer';

export interface EmbeddedDrawerLayoutProps
  extends HTMLElementProps<'div'>,
    Pick<DrawerProps, 'displayMode'> {
  /**
   * Determines if the Drawer instance is open or closed
   */
  isDrawerOpen: boolean;

  hasToolbar?: boolean;
}
