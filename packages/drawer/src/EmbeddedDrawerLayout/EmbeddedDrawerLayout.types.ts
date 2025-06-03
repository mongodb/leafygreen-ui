import { BaseDrawerLayout } from '../Drawer/Drawer.types';

export interface EmbeddedDrawerLayoutProps extends BaseDrawerLayout {
  /**
   * Determines if the Drawer instance is open or closed
   */
  isDrawerOpen: boolean;
}
