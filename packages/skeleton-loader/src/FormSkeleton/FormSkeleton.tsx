import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';
import { Skeleton } from '..';

import { baseStyles, fullWidthStyles } from './FormSkeleton.styles';
import { FormSkeletonProps } from '.';

export function FormSkeleton({
  darkMode: darkModeProp,
  enableAnimations,
  className,
  'data-lgid': dataLgId,
  ...rest
}: FormSkeletonProps) {
  const { darkMode } = useDarkMode(darkModeProp);
  const lgIds = getLgIds(dataLgId);
  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div
        className={cx(baseStyles, className)}
        {...rest}
        aria-busy
        data-lgid={lgIds.root}
      >
        <Skeleton
          className={fullWidthStyles}
          enableAnimations={enableAnimations}
          data-lgid={`${lgIds.form}-line-1`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          data-lgid={`${lgIds.form}-line-2`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          data-lgid={`${lgIds.form}-line-3`}
        />
        <Skeleton
          className={fullWidthStyles}
          enableAnimations={enableAnimations}
          data-lgid={`${lgIds.form}-line-4`}
        />
        <Skeleton
          enableAnimations={enableAnimations}
          data-lgid={`${lgIds.form}-line-5`}
        />
      </div>
    </LeafyGreenProvider>
  );
}

FormSkeleton.displayName = 'FormSkeleton';
