import React from 'react';
import Popover from '@leafygreen-ui/popover';
import { SearchResultsMenuProps } from './SearchResultsMenu.types';
import {
  searchResultsListStyles,
  searchResultsMenuStyles,
} from './SearchResultsMenu.style';

export const SearchResultsMenu = React.forwardRef<
  HTMLUListElement,
  SearchResultsMenuProps
>(({ children, refEl }: SearchResultsMenuProps, ref) => {
  return (
    <Popover
      active
      align="bottom"
      justify="start"
      className={searchResultsMenuStyles}
      refEl={refEl}
    >
      <ul role="listbox" ref={ref} className={searchResultsListStyles}>
        {children}
      </ul>
    </Popover>
  );
});

SearchResultsMenu.displayName = 'SearchResultsMenu';
