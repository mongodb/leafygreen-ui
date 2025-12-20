import React from 'react';

import { Body } from '@leafygreen-ui/typography';

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_PER_PAGE_OPTIONS,
} from './constants';
import { flexSectionStyles } from './Pagination.styles';
import { PaginationProps } from './Pagination.types';
import { getCurrentRangeString, getRangeMaxString } from './utils';

type PaginationRangeViewProps = Pick<
  PaginationProps,
  'itemsPerPage' | 'currentPage' | 'numTotalItems'
>;

/**
 * PaginationRangeView is a component that displays the current range of items.
 */
function PaginationRangeView<T extends number>({
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  currentPage = DEFAULT_CURRENT_PAGE,
  numTotalItems,
}: PaginationRangeViewProps) {
  return (
    <div className={flexSectionStyles}>
      <Body data-testid="lg-pagination-item-range">
        {getCurrentRangeString(itemsPerPage, currentPage, numTotalItems)} of{' '}
        {getRangeMaxString(numTotalItems)}
      </Body>
    </div>
  );
}

PaginationRangeView.displayName = 'PaginationRangeView';

export default PaginationRangeView;
