import { createContext, useContext } from 'react';

export interface DrawerContextProps {
  /**
   * Callback invoked in the `DrawerTabs` component to provide context that a
   * `DrawerTabs` instance is rendered in a `Drawer` instance
   */
  registerTabs: () => void;
}

export const DrawerContext = createContext<DrawerContextProps | null>(null);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('Component must be used within a Drawer');
  }

  return context;
};
