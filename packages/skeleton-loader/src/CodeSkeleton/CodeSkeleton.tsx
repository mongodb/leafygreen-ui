import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Size, Skeleton } from '..';

import { lineStyles, rootStyles } from './CodeSkeleton.styles';
import { CodeSkeletonProps } from '.';

export function CodeSkeleton({
  darkMode: darkModeProp,
  enableAnimations,
  className,
  ...rest
}: CodeSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div {...rest} className={cx(rootStyles, className)} aria-busy>
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
        />
      </div>
    </LeafyGreenProvider>
  );
}

CodeSkeleton.displayName = 'CodeSkeleton';
