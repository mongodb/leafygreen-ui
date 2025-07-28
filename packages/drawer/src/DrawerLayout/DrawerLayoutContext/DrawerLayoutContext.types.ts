import { DrawerProps } from '../../Drawer/Drawer.types';

export interface DrawerLayoutProviderProps {
  /**
   * Whether the drawer is currently open.
   */
  isDrawerOpen?: boolean;

  /**
   * Whether the drawer is resizable.
   */
  resizable?: boolean;

  /**
   * The display mode of the drawer.
   */
  displayMode?: DrawerProps['displayMode'];

  /**
   * Whether the drawer has a toolbar.
   */
  hasToolbar?: boolean;

  /**
   * Callback function to be called when the drawer is closed.
   */
  onClose?: DrawerProps['onClose'];
}

export interface DrawerLayoutContextType extends DrawerLayoutProviderProps {
  /**
   * The width of the drawer. This is used to update grid-template-columns in the DrawerLayout.
   */
  drawerWidth: number;

  /**
   * Determines if the drawer is currently being resized.
   */
  isDrawerResizing: boolean;

  /**
   * Function to set the drawer open state.
   */
  setIsDrawerOpen?: (isOpen: boolean) => void;

  /**
   * Function to set the drawer width.
   */
  setDrawerWidth?: (width: number) => void;

  /**
   * Function to set the drawer resizing state.
   */
  setIsDrawerResizing?: (isResizing: boolean) => void;
}
