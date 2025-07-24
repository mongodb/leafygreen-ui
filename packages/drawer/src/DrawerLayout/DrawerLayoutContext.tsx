import React, { createContext, PropsWithChildren, useContext } from 'react';

import { DisplayMode, DrawerProps } from '../Drawer/Drawer.types';

export interface DrawerLayoutContextType {
  isDrawerOpen?: boolean;
  resizable?: boolean;
  displayMode?: DrawerProps['displayMode'];
  onClose?: DrawerProps['onClose'];
  hasToolbar?: boolean;
}

export const DrawerLayoutContext = createContext<DrawerLayoutContextType>({
  resizable: false,
  isDrawerOpen: false,
  displayMode: DisplayMode.Overlay,
  onClose: undefined,
  hasToolbar: false,
});

/**
 * The DrawerLayoutProvider is used to provide the drawer layout context to the children components.
 * It is used to determine if the drawer is open, if it is resizable, and the display mode of the drawer.
 */
export const DrawerLayoutProvider = ({
  children,
  isDrawerOpen,
  resizable,
  displayMode,
  onClose,
  hasToolbar,
}: PropsWithChildren<DrawerLayoutContextType>) => {
  const value = {
    resizable,
    isDrawerOpen,
    displayMode,
    onClose,
    hasToolbar,
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
