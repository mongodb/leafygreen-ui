import React from 'react';
import range from 'lodash/range';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { Skeleton } from '../Skeleton';

import {
  getSkeletonListItemStyles,
  skeletonListWrapperStyles,
} from './ListSkeleton.styles';
import { ListSkeletonProps } from './ListSkeleton.types';

export function ListSkeleton({
  darkMode: darkModeProp,
  enableAnimations,
  count = 5,
  bulletsOnly,
  ...rest
}: ListSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ul
        className={skeletonListWrapperStyles}
        data-testid="lg-skeleton-list"
        aria-busy
        {...rest}
      >
        {range(count).map(i => (
          <li
            // Update the key when `count` changes so the item animation stays in sync
            key={`${i}/${count}`}
            className={getSkeletonListItemStyles(i, bulletsOnly)}
            data-testid="lg-skeleton-list_item"
          >
            <Skeleton enableAnimations={enableAnimations} size={Size.Small} />
          </li>
        ))}
      </ul>
    </LeafyGreenProvider>
  );
}

ListSkeleton.displayName = 'ListSkeleton';
