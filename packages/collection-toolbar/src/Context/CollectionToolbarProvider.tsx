import React, {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { Size, Variant } from '../shared.types';
import { type GetLgIdsReturnType } from '../utils';

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
  variant: Variant;
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
  createContext<CollectionToolbarContextProps | null>(null);

export const useCollectionToolbarContext = () => {
  const context = useContext(CollectionToolbarContext);

  if (!context)
    throw new Error(
      'useCollectionToolbarContext must be used within a CollectionToolbarProvider',
    );

  return context;
};

export const CollectionToolbarProvider = ({
  children,
  darkMode,
  size,
  variant,
  lgIds,
  isCollapsed: isCollapsedProp = false,
  onToggleCollapsed: onToggleCollapsedProp,
}: PropsWithChildren<CollectionToolbarContextProps>) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedProp);

  // Sync internal state when controlled prop changes
  useEffect(() => {
    setIsCollapsed(isCollapsedProp);
  }, [isCollapsedProp]);

  const handleToggleCollapsed: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      event => {
        setIsCollapsed(curr => !curr);
        onToggleCollapsedProp?.(event);
      },
      [onToggleCollapsedProp],
    );

  const collectionToolbarProviderData = useMemo(() => {
    return {
      size,
      variant,
      lgIds,
      isCollapsed,
      onToggleCollapsed: handleToggleCollapsed,
      darkMode,
    };
  }, [size, variant, lgIds, isCollapsed, handleToggleCollapsed, darkMode]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <CollectionToolbarContext.Provider value={collectionToolbarProviderData}>
        {children}
      </CollectionToolbarContext.Provider>
    </LeafyGreenProvider>
  );
};
