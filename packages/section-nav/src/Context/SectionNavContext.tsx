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
  hasContext: false,
});

export const useSectionNavContext = () =>
  useContext<SectionNavProviderProps>(
    SectionNavContext as React.Context<SectionNavProviderProps>,
  );

export const SectionNavContextProvider = ({
  children,
  lgIds,
  hasContext,
  darkMode = false,
}: PropsWithChildren<SectionNavProviderProps>) => {
  const SectionNavProvider = (
    SectionNavContext as React.Context<SectionNavProviderProps>
  ).Provider;

  const SectionNavProviderData = useMemo(() => {
    return {
      lgIds,
      hasContext,
    };
  }, [hasContext, lgIds]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <SectionNavProvider value={SectionNavProviderData}>
        {children}
      </SectionNavProvider>
    </LeafyGreenProvider>
  );
};
