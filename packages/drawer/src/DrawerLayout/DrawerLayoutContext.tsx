import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface DrawerLayoutContextType {
  isDrawerOpen: boolean;
  resizable: boolean;
}

export const DrawerLayoutContext = createContext<
  DrawerLayoutContextType | undefined
>(undefined);

export const DrawerLayoutProvider = ({
  children,
  isDrawerOpen,
  resizable,
}: PropsWithChildren<DrawerLayoutContextType>) => {
  const value = {
    resizable,
    isDrawerOpen,
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
