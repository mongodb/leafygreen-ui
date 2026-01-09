import React from 'react';
import range from 'lodash/range';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { Skeleton } from '../Skeleton';
import { getLgIds } from '../utils/getLgIds';

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
  'data-lgid': dataLgId,
  ...rest
}: ListSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const lgIds = getLgIds(dataLgId);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <ul
        className={skeletonListWrapperStyles}
        data-lgid={lgIds.root}
        data-testid={lgIds.root}
        aria-busy
        {...rest}
      >
        {range(count).map(i => (
          <li
            // Update the key when `count` changes so the item animation stays in sync
            key={`${i}/${count}`}
            className={getSkeletonListItemStyles(i, bulletsOnly)}
          >
            <Skeleton
              enableAnimations={enableAnimations}
              size={Size.Small}
              data-lgid={`${lgIds.listItem}-${i}`}
            />
          </li>
        ))}
      </ul>
    </LeafyGreenProvider>
  );
}

ListSkeleton.displayName = 'ListSkeleton';
