import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface SubMenuContextData {
  /** The depth of the current submenu */
  depth: number;
  /**
   * Whether the current submenu has an icon.
   * Along with `depth`, this affects the indentation of submenu items
   */
  hasIcon: boolean;
}

export const SubMenuContext = createContext<SubMenuContextData>({
  depth: 0,
  hasIcon: false,
});

export const SubMenuProvider = ({
  children,
  depth,
  hasIcon = false,
}: PropsWithChildren<SubMenuContextData>) => (
  <SubMenuContext.Provider value={{ depth, hasIcon }}>
    {children}
  </SubMenuContext.Provider>
);

/**
 * Returns the {@link SubMenuContextData} for a given submenu context
 */
export const useSubMenuContext = () => useContext(SubMenuContext);
