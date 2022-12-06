import React from 'react';
import { SearchResultsMenuProps } from './SearchResultsMenu.types';

export const SearchResultsMenu = React.forwardRef<
  HTMLUListElement,
  SearchResultsMenuProps
>(({ children }: SearchResultsMenuProps, ref) => {
  return <ul ref={ref}>{children}</ul>;
});

SearchResultsMenu.displayName = 'SearchResultsMenu';
