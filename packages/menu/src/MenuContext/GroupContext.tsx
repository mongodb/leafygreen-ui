import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface MenuGroupContextData {
  depth: number;
  hasIcon: boolean;
}

export const MenuGroupContext = createContext<MenuGroupContextData>({
  depth: 0,
  hasIcon: false,
});

export const MenuGroupProvider = ({
  children,
  depth,
  hasIcon = false,
}: PropsWithChildren<MenuGroupContextData>) => (
  <MenuGroupContext.Provider value={{ depth, hasIcon }}>
    {children}
  </MenuGroupContext.Provider>
);

export const useMenuGroupContext = () => useContext(MenuGroupContext);
