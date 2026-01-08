import React from 'react';

import { Card } from '@leafygreen-ui/card';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';
import { ParagraphSkeleton } from '..';

import { rootStyles } from './CardSkeleton.styles';
import { CardSkeletonProps } from '.';

export function CardSkeleton({
  darkMode: darkModeProp,
  enableAnimations,
  className,
  'data-lgid': dataLgId,
  ...rest
}: CardSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const lgIds = getLgIds(dataLgId);
  return (
    <Card
      {...rest}
      darkMode={darkMode}
      className={cx(rootStyles, className)}
      aria-busy
      data-lgid={lgIds.root}
      data-testid={lgIds.root}
    >
      <ParagraphSkeleton
        withHeader
        enableAnimations={enableAnimations}
        darkMode={darkMode}
      />
    </Card>
  );
}

CardSkeleton.displayName = 'CardSkeleton';
