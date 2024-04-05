import React from 'react';
import range from 'lodash/range';

import { Skeleton } from '@leafygreen-ui/skeleton-loader';

import {
  getSkeletonListItemStyles,
  skeletonListWrapperStyles,
} from './ListSkeleton.styles';
import { ListSkeletonProps } from './ListSkeleton.types';

export function ListSkeleton({ count = 5, bulletsOnly }: ListSkeletonProps) {
  return (
    <div className={skeletonListWrapperStyles} data-testid="lg-skeleton-list">
      {range(count).map(i => (
        <Skeleton
          // Update the key when `count` changes so the item animation stays in sync
          key={`${i}/${count}`}
          size="small"
          className={getSkeletonListItemStyles(i, bulletsOnly)}
        />
      ))}
    </div>
  );
}

ListSkeleton.displayName = 'ListSkeleton';
