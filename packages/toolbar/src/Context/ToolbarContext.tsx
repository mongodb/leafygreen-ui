import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils';

import { ToolbarProviderProps } from './ToolbarContext.types';

export const ToolbarContext = createContext<ToolbarProviderProps>({
  darkMode: false,
  focusedIndex: undefined,
  shouldFocus: false,
  setFocusedIndex: () => {},
  lgids: getLgIds(),
});

export const useToolbarContext = () =>
  useContext<ToolbarProviderProps>(
    ToolbarContext as React.Context<ToolbarProviderProps>,
  );

export const ToolbarContextProvider = ({
  children,
  darkMode,
  focusedIndex,
  shouldFocus,
  setFocusedIndex,
  lgids,
}: PropsWithChildren<ToolbarProviderProps>) => {
  const ToolbarProvider = (
    ToolbarContext as React.Context<ToolbarProviderProps>
  ).Provider;

  const toolbarProviderData = useMemo(() => {
    return {
      focusedIndex,
      darkMode,
      shouldFocus,
      setFocusedIndex,
      lgids,
    };
  }, [focusedIndex, darkMode, shouldFocus, setFocusedIndex, lgids]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ToolbarProvider value={toolbarProviderData}>{children}</ToolbarProvider>
    </LeafyGreenProvider>
  );
};
