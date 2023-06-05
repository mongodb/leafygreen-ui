import React from 'react';

import Card from '@leafygreen-ui/card';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { ParagraphSkeleton } from '../ParagraphSkeleton';

import { CardSkeletonProps } from '.';

export function CardSkeleton({
  darkMode: darkModeProp,
  ...rest
}: CardSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <Card aria-busy {...rest} darkMode={darkMode}>
      <ParagraphSkeleton withHeader />
    </Card>
  );
}

CardSkeleton.displayName = 'CardSkeleton';
