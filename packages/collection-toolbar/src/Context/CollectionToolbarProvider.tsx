import React, {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { Size, Variant } from '../shared.types';
import { getLgIds, type GetLgIdsReturnType } from '../utils';

export interface CollectionToolbarContextProps extends DarkModeProps {
  /**
   * The size of the CollectionToolbar and it's sub-components.
   *
   * @default `'default'`
   */
  size?: Size;
  /**
   * The variant of the CollectionToolbar. Determines the layout of the CollectionToolbar.
   *
   * @default `'default'`
   */
  variant?: Variant;
  /**
   * LGIDs for CollectionToolbar components
   */
  lgIds: GetLgIdsReturnType;
  /**
   * Whether the CollectionToolbar is collapsed.
   */
  isCollapsed?: boolean;
  /**
   * Function to toggle the collapsed state of the CollectionToolbar.
   */
  onToggleCollapsed?: MouseEventHandler<HTMLButtonElement>;
}

export const CollectionToolbarContext =
  createContext<CollectionToolbarContextProps>({
    size: Size.Default,
    variant: Variant.Default,
    lgIds: getLgIds(),
    isCollapsed: false,
    onToggleCollapsed: () => {},
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
  variant,
  lgIds,
}: PropsWithChildren<CollectionToolbarContextProps>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onToggleCollapsed = useCallback(() => {
    setIsCollapsed(curr => !curr);
  }, []);

  const collectionToolbarProviderData = useMemo(() => {
    return {
      size,
      variant,
      lgIds,
      isCollapsed,
      onToggleCollapsed,
    };
  }, [size, variant, lgIds, isCollapsed, onToggleCollapsed]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <CollectionToolbarContext.Provider value={collectionToolbarProviderData}>
        {children}
      </CollectionToolbarContext.Provider>
    </LeafyGreenProvider>
  );
};
