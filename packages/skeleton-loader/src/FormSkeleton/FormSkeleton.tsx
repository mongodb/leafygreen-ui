import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { Skeleton } from '..';

import { baseStyles, fullWidthStyles } from './FormSkeleton.styles';
import { FormSkeletonProps } from '.';

export function FormSkeleton({
  darkMode: darkModeProp,
  className,
  ...rest
}: FormSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={cx(baseStyles, className)} {...rest} aria-busy>
        <Skeleton className={fullWidthStyles} />
        <Skeleton />
        <Skeleton />
        <Skeleton className={fullWidthStyles} />
        <Skeleton />
      </div>
    </LeafyGreenProvider>
  );
}

FormSkeleton.displayName = 'FormSkeleton';
