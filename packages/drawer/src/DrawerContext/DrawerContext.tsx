import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface DrawerContextProps {
  /**
   *
   * Callback function to set the drawer open state.
   */
  setIsDrawerOpen: (isOpen: boolean) => void;

  /**
   * Boolean indicating if the drawer is currently open.
   */
  isDrawerOpen: boolean;
}

export const DrawerContext = createContext<DrawerContextProps>({
  setIsDrawerOpen: () => {},
  isDrawerOpen: false,
});

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      setIsDrawerOpen,
      isDrawerOpen,
    }),
    [setIsDrawerOpen, isDrawerOpen],
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  return context;
};
