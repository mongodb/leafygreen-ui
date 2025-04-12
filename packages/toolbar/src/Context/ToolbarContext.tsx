import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ToolbarProviderProps } from './ToolbarContext.types';

export const ToolbarContext = createContext<Partial<ToolbarProviderProps>>({});

export const useToolbarContext = () =>
  useContext<ToolbarProviderProps>(
    ToolbarContext as React.Context<ToolbarProviderProps>,
  );

export const ToolbarContextProvider = ({
  children,
  darkMode,
  focusedIndex,
}: PropsWithChildren<Partial<ToolbarProviderProps>>) => {
  const ToolbarProvider = (
    ToolbarContext as React.Context<ToolbarProviderProps>
  ).Provider;

  const toolbarProviderData = useMemo(() => {
    return {
      focusedIndex,
      darkMode,
    };
  }, [focusedIndex, darkMode]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ToolbarProvider value={toolbarProviderData}>{children}</ToolbarProvider>
    </LeafyGreenProvider>
  );
};
