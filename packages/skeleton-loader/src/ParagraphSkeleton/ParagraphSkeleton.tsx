import React from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Skeleton } from '..';

import {
  headerStyles,
  lastLineStyles,
  lineStyles,
} from './ParagraphSkeleton.styles';
import { ParagraphSkeletonProps } from '.';

export function ParagraphSkeleton({
  withHeader = false,
  darkMode: darkModeProp,
  ...rest
}: ParagraphSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div aria-busy {...rest}>
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
