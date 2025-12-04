import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';

import { DisplayMode, Size } from '../../Drawer/Drawer.types';

import {
  DrawerLayoutContextType,
  DrawerLayoutProviderProps,
} from './DrawerLayoutContext.types';

export const DrawerLayoutContext = createContext<DrawerLayoutContextType>({
  resizable: false,
  isDrawerOpen: false,
  displayMode: DisplayMode.Overlay,
  onClose: undefined,
  hasToolbar: false,
  isDrawerResizing: false,
  drawerWidth: 0,
  setHasToolbar: () => {},
  setIsDrawerOpen: () => {},
  setDrawerWidth: () => {},
  setIsDrawerResizing: () => {},
  size: Size.Default,
  initialFocus: 'auto',
});

/**
 * The DrawerLayoutProvider is used to provide the drawer layout context to the children components.
 * It is used to determine if the drawer is open, if it is resizable, and the display mode of the drawer.
 */
export const DrawerLayoutProvider = ({
  children,
  isDrawerOpen: isDrawerOpenProp = false,
  resizable,
  displayMode,
  onClose,
  hasToolbar: hasToolbarProp = false,
  size,
  initialFocus,
}: PropsWithChildren<DrawerLayoutProviderProps>) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(isDrawerOpenProp);
  const [isDrawerResizing, setIsDrawerResizing] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(0);
  const [hasToolbar, setHasToolbar] = React.useState(hasToolbarProp);

  useEffect(() => {
    setIsDrawerOpen(isDrawerOpenProp);
  }, [isDrawerOpenProp]);

  const value = {
    resizable,
    isDrawerOpen,
    displayMode,
    onClose,
    hasToolbar,
    setHasToolbar,
    setIsDrawerOpen,
    isDrawerResizing,
    setIsDrawerResizing,
    drawerWidth,
    setDrawerWidth,
    size,
    initialFocus,
  };

  return (
    <DrawerLayoutContext.Provider value={value}>
      {children}
    </DrawerLayoutContext.Provider>
  );
};

export const useDrawerLayoutContext = () => {
  return useContext(DrawerLayoutContext);
};
