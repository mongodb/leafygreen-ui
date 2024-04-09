import React from 'react';
import range from 'lodash/range';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Skeleton } from '../Skeleton';

import {
  getSkeletonListItemStyles,
  skeletonListWrapperStyles,
} from './ListSkeleton.styles';
import { ListSkeletonProps } from './ListSkeleton.types';

export function ListSkeleton({
  count = 5,
  bulletsOnly,
  darkMode,
  ...rest
}: ListSkeletonProps) {
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ul
        className={skeletonListWrapperStyles}
        data-testid="lg-skeleton-list"
        aria-busy="true"
        {...rest}
      >
        {range(count).map(i => (
          <li
            // Update the key when `count` changes so the item animation stays in sync
            key={`${i}/${count}`}
            className={getSkeletonListItemStyles(i, bulletsOnly)}
            data-testid="lg-skeleton-list_item"
          >
            <Skeleton size="small" />
          </li>
        ))}
      </ul>
    </LeafyGreenProvider>
  );
}

ListSkeleton.displayName = 'ListSkeleton';
