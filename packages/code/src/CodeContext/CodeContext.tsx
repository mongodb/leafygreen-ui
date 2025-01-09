import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { type CodeProviderProps } from './CodeContext.types';

export const CodeContext = createContext<Partial<CodeProviderProps>>({});

export const useCodeContext = () =>
  useContext<CodeProviderProps>(
    CodeContext as React.Context<CodeProviderProps>,
  );

const CodeContextProvider = ({
  children,
  contents,
  darkMode,
}: PropsWithChildren<CodeProviderProps>) => {
  const CodeProvider = (CodeContext as React.Context<CodeProviderProps>)
    .Provider;

  const CodeProviderData = useMemo(() => {
    return {
      contents,
    };
  }, [contents]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <CodeProvider value={CodeProviderData}>{children}</CodeProvider>
    </LeafyGreenProvider>
  );
};

export default CodeContextProvider;
