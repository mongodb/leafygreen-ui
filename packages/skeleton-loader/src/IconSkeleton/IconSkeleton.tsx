import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { Size, sizeMap } from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getIconSkeletonBaseStyles } from './IconSkeleton.styles';
import { IconSkeletonProps } from './IconSkeleton.types';

export function IconSkeleton({
  darkMode: darkModeProp,
  enableAnimations = false,
  size = Size.Default,
  className,
  ...rest
}: IconSkeletonProps) {
  const { theme } = useDarkMode(darkModeProp);
  const renderedSize = typeof size === 'number' ? size : sizeMap[size];
  return (
    <div
      {...rest}
      aria-hidden
      className={cx(
        getIconSkeletonBaseStyles(renderedSize, theme, enableAnimations),
        className,
      )}
    />
  );
}

IconSkeleton.displayName = 'IconSkeleton';
