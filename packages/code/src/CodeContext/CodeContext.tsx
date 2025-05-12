import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils';

import { type CodeProviderProps } from './CodeContext.types';

export const CodeContext = createContext<Partial<CodeProviderProps>>({
  lgIds: getLgIds(),
});

export const useCodeContext = () =>
  useContext<CodeProviderProps>(
    CodeContext as React.Context<CodeProviderProps>,
  );

const CodeContextProvider = ({
  children,
  contents,
  darkMode,
  language,
  isLoading,
  showPanel,
  lgIds,
}: PropsWithChildren<CodeProviderProps>) => {
  const CodeProvider = (CodeContext as React.Context<CodeProviderProps>)
    .Provider;

  const CodeProviderData = useMemo(() => {
    return {
      contents,
      language,
      showPanel,
      isLoading,
      lgIds,
    };
  }, [contents, language, showPanel, isLoading, lgIds]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <CodeProvider value={CodeProviderData}>{children}</CodeProvider>
    </LeafyGreenProvider>
  );
};

export default CodeContextProvider;
