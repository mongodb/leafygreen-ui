import { DrawerProps } from '../../Drawer/Drawer.types';

export interface DrawerLayoutProviderProps {
  isDrawerOpen?: boolean;
  resizable?: boolean;
  displayMode?: DrawerProps['displayMode'];
  onClose?: DrawerProps['onClose'];
  hasToolbar?: boolean;
}

export interface DrawerLayoutContextType extends DrawerLayoutProviderProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
  drawerWidth: number;
  setDrawerWidth: (width: number) => void;
  setIsDrawerResizing: (isResizing: boolean) => void;
  isDrawerResizing: boolean;
}
