import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils/getLgIds';

import {
  getSkeletonBaseStyles,
  sizeStyles,
  themeStyles,
} from './Skeleton.styles';
import { Size } from './Skeleton.types';
import { SkeletonProps } from '.';

export function Skeleton({
  enableAnimations = true,
  size = Size.Default,
  darkMode,
  className,
  'data-lgid': dataLgId,
  ...rest
}: SkeletonProps) {
  const { theme } = useDarkMode(darkMode);
  const lgIds = getLgIds(dataLgId);

  return (
    <div
      className={cx(
        getSkeletonBaseStyles({ enableAnimations }),
        sizeStyles[size],
        themeStyles[theme],
        className,
      )}
      aria-hidden
      data-lgid={lgIds.root}
      data-testid={lgIds.root}
      {...rest}
    />
  );
}

Skeleton.displayName = 'Skeleton';
