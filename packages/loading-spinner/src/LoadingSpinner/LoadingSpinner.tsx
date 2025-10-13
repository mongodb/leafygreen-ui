import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  getCircleStyles,
  getCircleSVGArgs,
  getSpinnerSize,
  getSvgStyles,
} from './LoadingSpinner.styles';
import {
  LoadingSpinnerProps,
  LoadingSpinnerSize,
} from './LoadingSpinner.types';

/**
 * SVG-based spinner loading indicator
 *
 * Provide the `size` prop to define a standard size,
 * or provide a custom number in px
 *
 * @param param0
 * @returns
 */
export function LoadingSpinner({
  size = LoadingSpinnerSize.Default,
  colorOverride,
  darkMode,
  className,
  ...rest
}: LoadingSpinnerProps) {
  const sizeInPx = getSpinnerSize(size);
  const { theme } = useDarkMode(darkMode);

  return (
    <svg
      className={cx(getSvgStyles(size), className)}
      viewBox={`0 0 ${sizeInPx} ${sizeInPx}`}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle
        className={getCircleStyles({ size, theme, colorOverride })}
        {...getCircleSVGArgs(size)}
      />
    </svg>
  );
}

LoadingSpinner.displayName = 'LoadingSpinner';
