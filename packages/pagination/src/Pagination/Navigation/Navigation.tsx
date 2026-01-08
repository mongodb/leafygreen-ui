import React from 'react';
import range from 'lodash/range';

import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { IconButton } from '@leafygreen-ui/icon-button';
import { consoleOnce } from '@leafygreen-ui/lib';
import {
  DropdownWidthBasis,
  Option,
  RenderMode,
  Select,
  Size,
} from '@leafygreen-ui/select';
import { Body } from '@leafygreen-ui/typography';

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_PER_PAGE_OPTIONS,
} from '../constants';
import { getSectionStyles } from '../Pagination.styles';
import { getTotalNumPages, isCurrentPageValid } from '../utils';

import { NavigationProps } from './Navigation.types';
import { getLgIds } from '../getLgIds';

/**
 * Navigation is a component that displays the current page and the total number of pages.
 * It also displays the previous and next page buttons.
 */
function Navigation<T extends number>({
  'data-lgid': dataLgId,
  onCurrentPageOptionChange,
  currentPage = DEFAULT_CURRENT_PAGE,
  numTotalItems,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  shouldDisableBackArrow,
  shouldDisableForwardArrow,
  onBackArrowClick,
  onForwardArrowClick,
  className,
}: NavigationProps) {
  const lgIds = getLgIds(dataLgId);
  const shouldDisableBackButton =
    shouldDisableBackArrow !== undefined
      ? shouldDisableBackArrow
      : numTotalItems !== undefined && currentPage <= 1;
  const shouldDisableForwardButton =
    shouldDisableForwardArrow !== undefined
      ? shouldDisableForwardArrow
      : numTotalItems !== undefined &&
        currentPage >= getTotalNumPages(numTotalItems, itemsPerPage);

  if (!isCurrentPageValid({ currentPage, numTotalItems, itemsPerPage })) {
    consoleOnce.error(`Value of the 'currentPage' prop is invalid.`);
  }

  return (
    <div
      className={getSectionStyles({ className })}
      data-testid={lgIds.navigation}
      data-lgid={lgIds.navigation}
    >
      {onCurrentPageOptionChange !== undefined && numTotalItems ? (
        <>
          <Select
            aria-label="Set current page"
            onChange={onCurrentPageOptionChange}
            value={String(currentPage)}
            allowDeselect={false}
            size={Size.XSmall}
            data-testid="lg-pagination-page-select"
            dropdownWidthBasis={DropdownWidthBasis.Option}
            renderMode={RenderMode.TopLayer}
          >
            {range(1, getTotalNumPages(numTotalItems, itemsPerPage) + 1).map(
              (pageNumber: number) => {
                return (
                  <Option key={pageNumber} value={String(pageNumber)}>
                    {pageNumber}
                  </Option>
                );
              },
            )}
          </Select>
          <Body>of {getTotalNumPages(numTotalItems, itemsPerPage)}</Body>
        </>
      ) : (
        <Body data-testid="lg-pagination-page-range">
          {currentPage} of{' '}
          {numTotalItems
            ? getTotalNumPages(numTotalItems, itemsPerPage)
            : 'many'}
        </Body>
      )}
      <IconButton
        aria-label="Previous page"
        disabled={shouldDisableBackButton}
        onClick={onBackArrowClick}
        data-testid="lg-pagination-back-button"
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        aria-label="Next page"
        disabled={shouldDisableForwardButton}
        onClick={onForwardArrowClick}
        data-testid="lg-pagination-next-button"
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
}

Navigation.displayName = 'Navigation';

export default Navigation;
