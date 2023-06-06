import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Skeleton } from '..';

import {
  headerStyles,
  lastLineStyles,
  lineStyles,
  rootStyles,
} from './ParagraphSkeleton.styles';
import { ParagraphSkeletonProps } from '.';

export function ParagraphSkeleton({
  withHeader = false,
  darkMode: darkModeProp,
  className,
  ...rest
}: ParagraphSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div aria-busy {...rest} className={cx(rootStyles, className)}>
        {withHeader && (
          <Skeleton
            size="large"
            className={headerStyles}
            data-testid="lg-paragraph-skeleton-header"
          />
        )}
        <Skeleton size="small" className={lineStyles} />
        <Skeleton size="small" className={lineStyles} />
        <Skeleton size="small" className={lastLineStyles} />
      </div>
    </LeafyGreenProvider>
  );
}

ParagraphSkeleton.displayName = 'ParagraphSkeleton';
