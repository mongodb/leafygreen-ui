import React, { createContext, PropsWithChildren, useContext } from 'react';
import { DisplayMode } from '../Drawer/Drawer.types';

export interface DrawerLayoutContextType {
  isDrawerOpen?: boolean;
  resizable?: boolean;
  displayMode?: DisplayMode;
}

export const DrawerLayoutContext = createContext<DrawerLayoutContextType>({
  resizable: false,
  isDrawerOpen: false,
  displayMode: DisplayMode.Embedded,
});

/**
 * The DrawerLayoutProvider is used to provide the drawer layout context to the children components.
 * It is used to determine if the drawer is open and if it is resizable.
 *
 * @param {PropsWithChildren<DrawerLayoutContextType>} props - The props for the DrawerLayoutProvider.
 * @returns {JSX.Element} The DrawerLayoutProvider component.
 */
export const DrawerLayoutProvider = ({
  children,
  isDrawerOpen,
  resizable,
  displayMode,
}: PropsWithChildren<DrawerLayoutContextType>) => {
  const value = {
    resizable,
    isDrawerOpen,
    displayMode,
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
