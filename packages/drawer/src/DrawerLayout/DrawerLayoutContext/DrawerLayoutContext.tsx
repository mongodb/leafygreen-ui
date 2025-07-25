import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';

import { DisplayMode } from '../../Drawer/Drawer.types';

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
  setIsDrawerOpen: () => {},
});

/**
 * The DrawerLayoutProvider is used to provide the drawer layout context to the children components.
 * It is used to determine if the drawer is open, if it is resizable, and the display mode of the drawer.
 */
export const DrawerLayoutProvider = ({
  children,
  isDrawerOpen: isDrawerOpenProp,
  resizable,
  displayMode,
  onClose,
  hasToolbar,
}: PropsWithChildren<DrawerLayoutProviderProps>) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(isDrawerOpenProp);

  useEffect(() => {
    setIsDrawerOpen(isDrawerOpenProp);
  }, [isDrawerOpenProp]);

  const value = {
    resizable,
    isDrawerOpen,
    displayMode,
    onClose,
    hasToolbar,
    setIsDrawerOpen,
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
