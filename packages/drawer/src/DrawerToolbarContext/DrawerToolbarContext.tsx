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
} from './DrawerToolbarContext.types';

export const DrawerToolbarContext =
  createContext<DrawerToolbarContextType | null>(null);

export const DrawerToolbarProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Array<ContextData>;
}) => {
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
          `The id, ${id}, does not correlate with any of the items in the toolbar. Please make sure the id is correct.`,
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
