import React from 'react';

import { Body } from '@leafygreen-ui/typography';

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_PER_PAGE_OPTIONS,
} from '../constants';
import { getSectionStyles } from '../Pagination.styles';
import { getCurrentRangeString, getRangeMaxString } from '../utils';

import { SummaryProps } from './Summary.types';

/**
 * Summary is a component that displays the current range of items.
 */
function Summary<T extends number>({
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE_OPTIONS[0] as T,
  currentPage = DEFAULT_CURRENT_PAGE,
  numTotalItems,
  className,
}: SummaryProps<T>) {
  return (
    <div className={getSectionStyles({ className })}>
      <Body data-testid="lg-pagination-item-range">
        {getCurrentRangeString(itemsPerPage, currentPage, numTotalItems)} of{' '}
        {getRangeMaxString(numTotalItems)}
      </Body>
    </div>
  );
}

Summary.displayName = 'Summary';

export default Summary;
