import React, { useMemo } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Popover from '@leafygreen-ui/popover';
import { spacing } from '@leafygreen-ui/tokens';

import { useSearchInputContext } from '../SearchInputContext';

import { LoadingOption } from './LoadingOption';
import {
  searchResultsListStyles,
  searchResultsMenuStyles,
  searchResultsMenuThemeStyles,
} from './SearchResultsMenu.style';
import { SearchResultsMenuProps } from './SearchResultsMenu.types';

const SearchResultsMenu = React.forwardRef<
  HTMLUListElement,
  SearchResultsMenuProps
>(({ children, open = false, refEl }: SearchResultsMenuProps, ref) => {
  const { theme } = useDarkMode();
  const { state } = useSearchInputContext();

  const menuWidth = useMemo(
    () => refEl.current?.clientWidth ?? 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refEl, open],
  );

  return (
    <Popover
      spacing={spacing[2]}
      active={open}
      align="bottom"
      justify="start"
      className={cx(
        searchResultsMenuStyles,
        searchResultsMenuThemeStyles[theme],
        css`
          width: ${menuWidth}px;
          min-width: ${menuWidth}px;
        `,
      )}
      refEl={refEl}
    >
      {state === 'loading' ? (
        <LoadingOption />
      ) : (
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
      )}
    </Popover>
  );
});

SearchResultsMenu.displayName = 'SearchResultsMenu';

export { SearchResultsMenu };
