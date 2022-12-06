import React, { useMemo } from 'react';
import Popover from '@leafygreen-ui/popover';
import { SearchResultsMenuProps } from './SearchResultsMenu.types';
import {
  searchResultsListStyles,
  searchResultsMenuStyles,
} from './SearchResultsMenu.style';
import { spacing } from '@leafygreen-ui/tokens';
import { css, cx } from '@leafygreen-ui/emotion';

const SearchResultsMenu = React.forwardRef<
  HTMLUListElement,
  SearchResultsMenuProps
>(({ children, open = false, refEl }: SearchResultsMenuProps, ref) => {
  const menuWidth = useMemo(
    () => (open ? refEl.current?.clientWidth ?? 0 : 0),
    [refEl, open],
  );

  return (
    <Popover
      spacing={spacing[1]}
      active={open}
      align="bottom"
      justify="start"
      className={cx(
        searchResultsMenuStyles,
        css`
          min-width: ${menuWidth}px;
        `,
      )}
      refEl={refEl}
    >
      <ul
        role="listbox"
        aria-live="polite"
        aria-relevant="additions removals"
        aria-expanded={open}
        ref={ref}
        className={searchResultsListStyles}
      >
        {children}
      </ul>
    </Popover>
  );
});

SearchResultsMenu.displayName = 'SearchResultsMenu';

export { SearchResultsMenu };
