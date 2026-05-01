import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_PER_PAGE_OPTIONS,
} from './constants';
import { getLgIds } from './getLgIds';
import Navigation from './Navigation';
import PageSize from './PageSize';
import { baseStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';
import Summary from './Summary';

/**
 * Pagination enables the segmentation of extensive content into smaller portions distributed across various pages. Implement a Pagination component when dealing with an abundance of results to prevent overwhelming users with excessive information on a single page.
 */
function Pagination<T extends number>({
  id: idProp,
  className,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE_OPTIONS as Array<T>,
  onItemsPerPageOptionChange,
  currentPage = DEFAULT_CURRENT_PAGE,
  onCurrentPageOptionChange,
  numTotalItems,
  onBackArrowClick,
  shouldDisableBackArrow,
  onForwardArrowClick,
  shouldDisableForwardArrow,
  darkMode: darkModeProp,
  'data-lgid': dataLgId,
  ...rest
}: PaginationProps<T>) {
  const { darkMode } = useDarkMode(darkModeProp);
  const lgIds = getLgIds(dataLgId);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        className={cx(baseStyles, className)}
        data-testid={lgIds.root}
        data-lgid={lgIds.root}
        {...rest}
      >
        <PageSize
          id={idProp}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageOptionChange={onItemsPerPageOptionChange}
        />
        <Summary
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          numTotalItems={numTotalItems}
        />
        <Navigation
          onCurrentPageOptionChange={onCurrentPageOptionChange}
          currentPage={currentPage}
          numTotalItems={numTotalItems}
          itemsPerPage={itemsPerPage}
          shouldDisableBackArrow={shouldDisableBackArrow}
          shouldDisableForwardArrow={shouldDisableForwardArrow}
          onBackArrowClick={onBackArrowClick}
          onForwardArrowClick={onForwardArrowClick}
        />
      </div>
    </LeafyGreenProvider>
  );
}

Pagination.displayName = 'Pagination';

export default Pagination;
