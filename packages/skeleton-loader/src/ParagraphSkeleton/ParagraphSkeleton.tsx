import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';
import { Size, Skeleton } from '..';

import {
  headerStyles,
  lastLineStyles,
  lineStyles,
  rootStyles,
} from './ParagraphSkeleton.styles';
import { ParagraphSkeletonProps } from '.';

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
        data-lgid={lgIds.root}
        {...rest}
        className={cx(rootStyles, className)}
        aria-busy
      >
        {withHeader && (
          <Skeleton
            enableAnimations={enableAnimations}
            className={headerStyles}
            data-lgid={lgIds.paragraphHeader}
            data-testid="lg-paragraph-skeleton-header"
          />
        )}
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
          data-lgid={`${lgIds.paragraph}-line-1`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lineStyles}
          data-lgid={`${lgIds.paragraph}-line-2`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          size={Size.Small}
          className={lastLineStyles}
          data-lgid={`${lgIds.paragraph}-line-3`}
        />
      </div>
    </LeafyGreenProvider>
  );
}

ParagraphSkeleton.displayName = 'ParagraphSkeleton';
