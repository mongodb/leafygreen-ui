import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Size, Skeleton } from '..';

import {
  headerStyles,
  lastLineStyles,
  lineStyles,
  rootStyles,
} from './ParagraphSkeleton.styles';
import { ParagraphSkeletonProps } from '.';
import { getLgIds } from '../utils/getLgIds';

export function ParagraphSkeleton({
  darkMode: darkModeProp,
  enableAnimations,
  withHeader = false,
  className,
  'data-lgid': dataLgId,
  ...rest
}: ParagraphSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const lgIds = getLgIds(dataLgId);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        {...rest}
        className={cx(rootStyles, className)}
        aria-busy
        data-lgid={lgIds.root}
      >
        {withHeader && (
          <Skeleton
            enableAnimations={enableAnimations}
            className={headerStyles}
            data-testid="lg-paragraph-skeleton-header"
          />
        )}
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
          className={lastLineStyles}
        />
      </div>
    </LeafyGreenProvider>
  );
}

ParagraphSkeleton.displayName = 'ParagraphSkeleton';
