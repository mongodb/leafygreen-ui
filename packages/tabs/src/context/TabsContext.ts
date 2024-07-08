import { createContext, useContext } from 'react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

export interface TabsContextProps {
  as: PolymorphicAs;
  darkMode: boolean;
  forceRenderAllTabPanels: boolean;
  selectedIndex: number;
}

export const TabsContext = createContext<TabsContextProps>({
  as: 'button',
  darkMode: false,
  forceRenderAllTabPanels: false,
  selectedIndex: 0,
});

export const useTabsContext = () => {
  return useContext(TabsContext);
};
