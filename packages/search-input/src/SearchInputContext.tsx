import React, { createContext, PropsWithChildren, useContext } from 'react';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { SearchInputProps } from '.';

export interface SearchInputContextProps
  extends Pick<SearchInputProps, 'state'> {
  highlight?: number;
  resultDynamicRefs?: ReturnType<typeof useDynamicRefs>;
}

const SearchInputContext = createContext<SearchInputContextProps>({});

export function SearchInputContextProvider({
  children,
  ...props
}: PropsWithChildren<SearchInputContextProps>) {
  return (
    <SearchInputContext.Provider value={props}>
      {children}
    </SearchInputContext.Provider>
  );
}

export function useSearchInputContext() {
  return useContext(SearchInputContext);
}
