import { createContext, useContext } from 'react';

import { TabsProps } from '../Tabs';

export type TabsContextProps = Required<
  Pick<
    TabsProps<number>,
    'as' | 'darkMode' | 'forceRenderAllTabPanels' | 'selected' | 'size'
  >
>;

export const TabsContext = createContext<TabsContextProps>({
  as: 'button',
  darkMode: false,
  forceRenderAllTabPanels: false,
  selected: 0,
  size: 'default',
});

export const useTabsContext = () => {
  return useContext(TabsContext);
};
