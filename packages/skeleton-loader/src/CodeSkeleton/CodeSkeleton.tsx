import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';
import { Size, Skeleton } from '..';

import { lineStyles, rootStyles } from './CodeSkeleton.styles';
import { CodeSkeletonProps } from '.';

export function CodeSkeleton({
  darkMode: darkModeProp,
  enableAnimations,
  className,
  'data-lgid': dataLgId,
  ...rest
}: CodeSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const lgIds = getLgIds(dataLgId);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        data-lgid={lgIds.root}
        {...rest}
        className={cx(rootStyles, className)}
        aria-busy
      >
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
          data-lgid={`${lgIds.line}-1`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
          data-lgid={`${lgIds.line}-2`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
          data-lgid={`${lgIds.line}-3`}
        />
      </div>
    </LeafyGreenProvider>
  );
}

CodeSkeleton.displayName = 'CodeSkeleton';
