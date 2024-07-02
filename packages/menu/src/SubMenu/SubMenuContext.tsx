import React, { createContext, PropsWithChildren, useContext } from 'react';

export interface SubMenuContextData {
  depth: number;
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

export const useSubMenuContext = () => useContext(SubMenuContext);
