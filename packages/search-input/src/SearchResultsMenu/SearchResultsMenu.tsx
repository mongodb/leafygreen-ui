import React, { useMemo } from 'react';
import isUndefined from 'lodash/isUndefined';

import { css, cx } from '@leafygreen-ui/emotion';
import { useAvailableSpace } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Popover from '@leafygreen-ui/popover';
import { spacing } from '@leafygreen-ui/tokens';

import { useSearchInputContext } from '../SearchInputContext';

import { EmptyOption } from './EmptyOption';
import { LoadingOption } from './LoadingOption';
import {
  searchResultsListStyles,
  searchResultsMenuStyles,
  searchResultsMenuThemeStyles,
} from './SearchResultsMenu.style';
import { SearchResultsMenuProps } from './SearchResultsMenu.types';

const MAX_MENU_HEIGHT = 256;

/**
 * @internal
 */
export const SearchResultsMenu = React.forwardRef<
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

  /** The max height of the menu element */
  const availableSpace = useAvailableSpace(refEl);
  const maxHeightValue = !isUndefined(availableSpace)
    ? `${Math.min(availableSpace, MAX_MENU_HEIGHT)}px`
    : 'unset';

  return (
    <Popover
      data-testid="lg-search-input-popover"
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
          className={cx(
            searchResultsListStyles,
            css`
              max-height: ${maxHeightValue};
            `,
          )}
        >
          {React.Children.count(children) ? children : <EmptyOption />}
        </ul>
      )}
    </Popover>
  );
});

SearchResultsMenu.displayName = 'SearchResultsMenu';
