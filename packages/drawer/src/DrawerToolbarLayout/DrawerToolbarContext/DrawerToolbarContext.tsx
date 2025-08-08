import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { TRANSITION_DURATION } from '../../constants';

import {
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
  const [activeDrawerId, setActiveDrawerId] = useState<DataId | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  /**
   * Checks if there if there is any content for the provided id.
   * If there is, it opens the drawer and sets the active drawer id.
   * If there is no content, it logs an error and does not open the drawer.
   */
  const openDrawer = useCallback(
    (id: DataId) => {
      const activeDrawerContent = data.find(
        item => item?.id === id && item?.content,
      );

      if (activeDrawerContent) {
        setIsDrawerOpen(true);
        setActiveDrawerId(id);
      } else {
        console.error(
          `No matching item found in the toolbar for the provided id: ${id}. Please verify that the id is correct.`,
        );
      }
    },
    [data, setIsDrawerOpen],
  );

  /**
   * Closes the drawer and sets the active drawer id to null.
   * The content will be removed after a delay to allow the drawer to close first.
   */
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    // Delay the removal of the content to allow the drawer to close before removing the content
    setTimeout(() => {
      setActiveDrawerId(null);
    }, TRANSITION_DURATION);
  }, [setActiveDrawerId]);

  /**
   * Returns the content for the active drawer id.
   * If there is no active drawer id, it returns undefined.
   */
  const getActiveDrawerContent = useCallback(() => {
    if (!activeDrawerId) return undefined;
    const content = data.find(item => item?.id === activeDrawerId);
    return content;
  }, [activeDrawerId, data]);

  const value = useMemo(
    () => ({
      openDrawer,
      closeDrawer,
      getActiveDrawerContent,
      isDrawerOpen,
    }),
    [openDrawer, closeDrawer, getActiveDrawerContent, isDrawerOpen],
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
