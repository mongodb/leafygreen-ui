import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import { CollectionToolbarProps } from '../CollectionToolbar.types';

export interface CollectionToolbarContextProps
  extends Pick<CollectionToolbarProps, 'variant' | 'size'> {
  isCollapsed: boolean;
  onCollapse?: () => void;
}

const CollectionToolbarContext = createContext<CollectionToolbarContextProps>({
  isCollapsed: false,
});

export const useCollectionToolbarContext = () => {
  const context = useContext(CollectionToolbarContext);

  if (!context) {
    throw new Error(
      'useCollectionToolbarContext must be used within a CollectionToolbarContextProvider',
    );
  }

  return context;
};

export const CollectionToolbarContextProvider = ({
  children,
  variant,
  size,
  isCollapsed,
  onCollapse,
}: PropsWithChildren<CollectionToolbarContextProps>) => {
  const contextValue = useMemo(
    () => ({ variant, size, isCollapsed, onCollapse }),
    [variant, size, isCollapsed, onCollapse],
  );

  return (
    <CollectionToolbarContext.Provider value={contextValue}>
      {children}
    </CollectionToolbarContext.Provider>
  );
};
