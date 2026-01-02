import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { Size } from '../shared.types';
import { getLgIds, type GetLgIdsReturnType } from '../utils';

export interface CollectionToolbarContextProps extends DarkModeProps {
  /**
   * The size of the CollectionToolbar and it's sub-components.
   *
   * @default `'default'`
   */
  size?: Size;
  /**
   * LGIDs for CollectionToolbar components
   */
  lgIds: GetLgIdsReturnType;
}

export const CollectionToolbarContext =
  createContext<CollectionToolbarContextProps>({
    size: Size.Default,
    lgIds: getLgIds(),
  });

export const useCollectionToolbarContext = () => {
  const context = useContext(CollectionToolbarContext);
  if (!context)
    throw new Error(
      'useCollectionToolbarContext must be used within a CollectionToolbarProvider',
    );
  return useContext(CollectionToolbarContext);
};

export const CollectionToolbarProvider = ({
  children,
  darkMode,
  size,
  lgIds,
}: PropsWithChildren<CollectionToolbarContextProps>) => {
  const collectionToolbarProviderData = useMemo(() => {
    return {
      size,
      lgIds,
    };
  }, [size, lgIds]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <CollectionToolbarContext.Provider value={collectionToolbarProviderData}>
        {children}
      </CollectionToolbarContext.Provider>
    </LeafyGreenProvider>
  );
};
