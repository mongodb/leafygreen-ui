import React from 'react';
import Popover from '@leafygreen-ui/popover';
import { SearchResultsMenuProps } from './SearchResultsMenu.types';
import { searchResultsMenuStyles } from './SearchResultsMenu.style';

export const SearchResultsMenu = React.forwardRef<
  HTMLUListElement,
  SearchResultsMenuProps
>(({ children }: SearchResultsMenuProps, ref) => {
  return (
    <Popover align="bottom" justify="start" className={searchResultsMenuStyles}>
      <ul role="listbox" ref={ref}>
        {children}
      </ul>
    </Popover>
  );
});

SearchResultsMenu.displayName = 'SearchResultsMenu';
