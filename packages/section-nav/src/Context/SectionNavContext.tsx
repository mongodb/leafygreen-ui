import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';

import { SectionNavProviderProps } from './SectionNavContext.types';

export const SectionNavContext = createContext<SectionNavProviderProps>({
  lgIds: getLgIds(),
  inContext: false,
});

export const useSectionNavContext = () =>
  useContext<SectionNavProviderProps>(
    SectionNavContext as React.Context<SectionNavProviderProps>,
  );

export const SectionNavContextProvider = ({
  children,
  lgIds,
  inContext,
  darkMode = false,
}: PropsWithChildren<SectionNavProviderProps>) => {
  const ToolbarProvider = (
    SectionNavContext as React.Context<SectionNavProviderProps>
  ).Provider;

  const toolbarProviderData = useMemo(() => {
    return {
      lgIds,
      inContext,
    };
  }, [lgIds]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ToolbarProvider value={toolbarProviderData}>{children}</ToolbarProvider>
    </LeafyGreenProvider>
  );
};
