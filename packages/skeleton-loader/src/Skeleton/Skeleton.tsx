import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { rootStyles, sizeStyles, themeStyles } from './Skeleton.styles';
import { Size } from './Skeleton.types';
import { SkeletonProps } from '.';

export function Skeleton({
  size = Size.Default,
  darkMode,
  className,
  ...rest
}: SkeletonProps) {
  const { theme } = useDarkMode(darkMode);
  return (
    <div
      className={cx(
        rootStyles,
        sizeStyles[size],
        themeStyles[theme],
        className,
      )}
      aria-hidden
      {...rest}
    />
  );
}

Skeleton.displayName = 'Skeleton';
