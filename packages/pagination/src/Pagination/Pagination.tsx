import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronLeft from '@leafygreen-ui/icon/dist/ChevronLeft';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Option, Select } from '@leafygreen-ui/select';
import { Body, Label } from '@leafygreen-ui/typography';

import { baseStyles, flexContainerStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';

function Pagination({
  id: idProp,
  className,
  itemsPerPage,
  itemsPerPageOptions,
  onItemsPerPageOptionChange,
  currentPage,
  onCurrentPageOptionChange,
  numTotalItems,
  onBackArrowClick,
  onForwardArrowClick,
  darkMode: darkModeProp,
  ...rest
}: PaginationProps) {
  const itemsPerPageLabelId = useIdAllocator({
    prefix: 'pagination',
    id: idProp,
  });
  const itemsPerPageSelectId = useIdAllocator({
    prefix: 'pagination',
    id: idProp,
  });
  const { darkMode } = useDarkMode(darkModeProp);

  const getCurrentRangeString = () => {
    return `${itemsPerPage * currentPage + 1} - ${
      itemsPerPage * (currentPage + 1)
    }`;
  };

  const getRangeMaxString = () => {
    return numTotalItems ? `${numTotalItems} items` : 'many';
  };

  const getTotalNumPages = () => {
    return Math.ceil(numTotalItems / itemsPerPage);
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={cx(flexContainerStyles, baseStyles, className)} {...rest}>
        <div className={flexContainerStyles}>
          {onItemsPerPageOptionChange ?? (
            <>
              <Label id={itemsPerPageLabelId} htmlFor={itemsPerPageSelectId}>
                Items per page:
              </Label>
              {/* @ts-expect-error */}
              <Select
                onChange={onItemsPerPageOptionChange}
                aria-labelledby={itemsPerPageLabelId}
                value={itemsPerPage.toString()}
                id={itemsPerPageSelectId}
                allowDeselect={false}
              >
                {itemsPerPageOptions.map((option: number) => {
                  <Option value={option.toString()}>{option}</Option>;
                })}
              </Select>
            </>
          )}
        </div>
        <div>
          <Body>
            {getCurrentRangeString()} of {getRangeMaxString()}
          </Body>
        </div>
        <div className={flexContainerStyles}>
          {onCurrentPageOptionChange && numTotalItems ? (
            <>
              {/* @ts-expect-error */}
              <Select
                onChange={onCurrentPageOptionChange}
                aria-label="Set current page"
                value={currentPage.toString()}
                allowDeselect={false}
              >
                {Array.from(Array(getTotalNumPages()).keys()).map(
                  (pageIndex: number) => {
                    const option = pageIndex + 1;
                    <Option value={option.toString()}>{option}</Option>;
                  },
                )}
              </Select>
              <Body>of {getTotalNumPages()}</Body>
            </>
          ) : (
            <Body>
              {currentPage} of {numTotalItems ? getTotalNumPages() : 'many'}
            </Body>
          )}
          <IconButton aria-label="Previous page" onClick={onBackArrowClick}>
            <ChevronLeft />
          </IconButton>
          <IconButton aria-label="Next page" onClick={onForwardArrowClick}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </LeafyGreenProvider>
  );
}

Pagination.displayName = 'Pagination';

export default Pagination;
