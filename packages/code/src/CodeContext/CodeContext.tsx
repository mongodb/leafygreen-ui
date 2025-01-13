import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { type CodeProviderProps } from './CodeContext.types';

// TODO: defaults for darkMode, language, and hasPanel
export const CodeContext = createContext<Partial<CodeProviderProps>>({});

export const useCodeContext = () =>
  useContext<CodeProviderProps>(
    CodeContext as React.Context<CodeProviderProps>,
  );

const CodeContextProvider = ({
  children,
  contents,
  darkMode,
  language,
  hasPanel,
}: PropsWithChildren<CodeProviderProps>) => {
  const CodeProvider = (CodeContext as React.Context<CodeProviderProps>)
    .Provider;

  const CodeProviderData = useMemo(() => {
    return {
      contents,
      language,
      hasPanel,
    };
  }, [contents]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <CodeProvider value={CodeProviderData}>{children}</CodeProvider>
    </LeafyGreenProvider>
  );
};

export default CodeContextProvider;
