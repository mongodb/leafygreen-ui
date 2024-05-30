import { createContext, useContext } from 'react';

export interface TabsContextProps {
  forceRenderAllTabPanels: boolean;
  selectedIndex: number;
}

export const TabsContext = createContext<TabsContextProps>({
  forceRenderAllTabPanels: false,
  selectedIndex: 0,
});

export const useTabsContext = () => {
  return useContext(TabsContext);
};
