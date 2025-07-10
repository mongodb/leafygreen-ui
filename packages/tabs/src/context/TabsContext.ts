import { createContext, useContext } from 'react';

import { TabsProps } from '../Tabs';

export type TabsContextProps = Required<
  Pick<
    TabsProps<number | string>,
    'as' | 'darkMode' | 'forceRenderAllTabPanels' | 'size'
  >
> & {
  selectedIndex: number;
};

export const TabsContext = createContext<TabsContextProps>({
  as: 'button',
  darkMode: false,
  forceRenderAllTabPanels: false,
  selectedIndex: 0,
  size: 'default',
});

export const useTabsContext = () => {
  return useContext(TabsContext);
};
