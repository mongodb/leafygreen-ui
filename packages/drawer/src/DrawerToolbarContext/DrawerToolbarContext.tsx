import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  ContextData,
  DataId,
  DrawerToolbarContextType,
  DrawerToolbarProviderProps,
} from './DrawerToolbarContext.types';

export const DrawerToolbarContext =
  createContext<DrawerToolbarContextType | null>(null);

export const DrawerToolbarProvider = ({
  children,
  data,
}: DrawerToolbarProviderProps) => {
  const [content, setContent] = useState<ContextData>(undefined);

  const openDrawer = useCallback(
    (id: DataId) => {
      const getActiveDrawerContent = data.find(item => item?.id === id);

      if (getActiveDrawerContent) {
        setContent(prev => {
          if (prev?.id === id) return prev;
          return getActiveDrawerContent;
        });
      } else {
        console.error(
          `No matching item found in the toolbar for the provided id: ${id}. Please verify that the id is correct.`,
        );
      }
    },
    [setContent],
  );

  const closeDrawer = useCallback(() => {
    setContent(undefined);
  }, [setContent]);

  const getActiveDrawerContent = useCallback(() => {
    return content;
  }, [content]);

  const value = useMemo(
    () => ({
      openDrawer,
      closeDrawer,
      getActiveDrawerContent,
    }),
    [openDrawer, closeDrawer, getActiveDrawerContent],
  );

  return (
    <DrawerToolbarContext.Provider value={value}>
      {children}
    </DrawerToolbarContext.Provider>
  );
};

export const useDrawerToolbarContext = () => {
  const context = useContext(DrawerToolbarContext);

  if (!context) {
    throw new Error(
      'useDrawerToolbarContext must be used within a DrawerToolbarProvider',
    );
  }

  return context;
};
