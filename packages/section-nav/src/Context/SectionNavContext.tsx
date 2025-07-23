import React, { createContext, PropsWithChildren, useContext } from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';

import { SectionNavProviderProps } from './SectionNavContext.types';

export const SectionNavContext = createContext<SectionNavProviderProps>({
  lgIds: getLgIds(),
  hasContext: false,
});

export const useSectionNavContext = () =>
  useContext<SectionNavProviderProps>(SectionNavContext);

export const SectionNavContextProvider = ({
  children,
  lgIds,
  hasContext,
  darkMode = false,
}: PropsWithChildren<SectionNavProviderProps>) => {
  const SectionNavProvider = SectionNavContext.Provider;

  const sectionNavProviderData = {
    lgIds,
    hasContext,
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <SectionNavProvider value={sectionNavProviderData}>
        {children}
      </SectionNavProvider>
    </LeafyGreenProvider>
  );
};
