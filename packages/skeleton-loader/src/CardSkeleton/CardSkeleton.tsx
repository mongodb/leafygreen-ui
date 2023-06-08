import React from 'react';

import Card from '@leafygreen-ui/card';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ParagraphSkeleton } from '..';

import { rootStyles } from './CardSkeleton.styles';
import { CardSkeletonProps } from '.';

export function CardSkeleton({
  darkMode: darkModeProp,
  className,
  ...rest
}: CardSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <Card
      {...rest}
      darkMode={darkMode}
      className={cx(rootStyles, className)}
      aria-busy
    >
      <ParagraphSkeleton withHeader />
    </Card>
  );
}

CardSkeleton.displayName = 'CardSkeleton';
