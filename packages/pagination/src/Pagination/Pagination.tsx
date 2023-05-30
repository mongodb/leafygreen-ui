import React from 'react';
import { range } from 'lodash';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { DropdownWidthBasis, Option, Select } from '@leafygreen-ui/select';
import { Body } from '@leafygreen-ui/typography';

import { baseStyles, flexSectionStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';
import {
  getCurrentRangeString,
  getRangeMaxString,
  getTotalNumPages,
} from './utils';

const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

function Pagination<T extends number>({
  id: idProp,
  className,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  itemsPerPageOptions = DEFAULT_ITEMS_PER_PAGE_OPTIONS as Array<T>,
  onItemsPerPageOptionChange,
  currentPage = 1,
  onCurrentPageOptionChange,
  numTotalItems,
  onBackArrowClick,
  shouldDisableBackArrow,
  onForwardArrowClick,
  shouldDisableForwardArrow,
  darkMode: darkModeProp,
  ...rest
}: PaginationProps<T>) {
  const { darkMode } = useDarkMode(darkModeProp);
  const itemsPerPageLabelId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-label',
    id: idProp,
  });
  const itemsPerPageSelectId = useIdAllocator({
    prefix: 'lg-pagination-items-per-page-select',
    id: idProp,
  });
  const shouldDisableBackButton =
    shouldDisableBackArrow !== undefined
      ? shouldDisableBackArrow
      : numTotalItems !== undefined && currentPage <= 1;
  const shouldDisableForwardButton =
    shouldDisableForwardArrow !== undefined
      ? shouldDisableForwardArrow
      : numTotalItems !== undefined &&
        currentPage >= getTotalNumPages(numTotalItems, itemsPerPage);

  if (
    currentPage < 1 ||
    (numTotalItems &&
      getTotalNumPages(numTotalItems, itemsPerPage) < currentPage)
  ) {
    console.error(`Value of the 'currentPage' prop is invalid.`);
  }

  if (!itemsPerPageOptions.includes(itemsPerPage)) {
    console.error(
      `Value of the 'itemsPerPage' prop is not a valid option specified in 'itemsPerPageOptions'.`,
    );
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={cx(baseStyles, className)} {...rest}>
        <div className={flexSectionStyles}>
          {onItemsPerPageOptionChange !== undefined && (
            <>
              <Body
                as="label"
                id={itemsPerPageLabelId}
                htmlFor={itemsPerPageSelectId}
              >
                Items per page:
              </Body>
              <Select
                onChange={onItemsPerPageOptionChange}
                aria-labelledby={itemsPerPageLabelId}
                value={String(itemsPerPage)}
                id={itemsPerPageSelectId}
                allowDeselect={false}
                size="xsmall"
                dropdownWidthBasis={DropdownWidthBasis.Option}
              >
                {itemsPerPageOptions.map((option: number) => (
                  <Option key={option} value={String(option)}>
                    {option}
                  </Option>
                ))}
              </Select>
            </>
          )}
        </div>
        <div className={flexSectionStyles}>
          <Body data-testid="lg-pagination-item-range">
            {getCurrentRangeString(itemsPerPage, currentPage, numTotalItems)} of{' '}
            {getRangeMaxString(numTotalItems)}
          </Body>
        </div>
        <div className={flexSectionStyles}>
          {onCurrentPageOptionChange !== undefined && numTotalItems ? (
            <>
              <Select
                aria-label="Set current page"
                onChange={onCurrentPageOptionChange}
                value={String(currentPage)}
                allowDeselect={false}
                size="xsmall"
                data-testid="lg-pagination-page-select"
                dropdownWidthBasis={DropdownWidthBasis.Option}
              >
                {range(
                  1,
                  getTotalNumPages(numTotalItems, itemsPerPage) + 1,
                ).map((pageNumber: number) => {
                  return (
                    <Option key={pageNumber} value={String(pageNumber)}>
                      {pageNumber}
                    </Option>
                  );
                })}
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
      </div>
    </LeafyGreenProvider>
  );
}

Pagination.propTypes = {
  darkMode: PropTypes.bool,
  onBackArrowClick: PropTypes.func.isRequired,
  onForwardArrowClick: PropTypes.func.isRequired,
  numTotalItems: PropTypes.number,
  onCurrentPageOptionChange: PropTypes.func,
  currentPage: PropTypes.number,
  onItemsPerPageOptionChange: PropTypes.func,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  itemsPerPage: PropTypes.number,
  // casting to unknown ensures TS does not infer types from these prop-types
};

Pagination.displayName = 'Pagination';

export default Pagination;
