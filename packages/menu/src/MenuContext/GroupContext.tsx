import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface MenuGroupContextData {
  /** The depth of the current group */
  depth: number;
  /**
   * Whether the current group has an icon.
   * Along with `depth`, this affects the indentation of child items
   */
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

/**
 * Returns the {@link MenuGroupContextData} for a given menu group context
 */
export const useMenuGroupContext = () => useContext(MenuGroupContext);
