import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { getLgIds } from '../utils/getLgIds';

import { getSpinnerSize } from './constants';
import {
  getCircleStyles,
  getCircleSVGArgs,
  getSvgStyles,
} from './Spinner.styles';
import { SpinnerProps } from './Spinner.types';

/**
 * SVG-based spinner loading indicator
 *
 * Provide the `size` prop to define a standard size,
 * or provide a custom number in px
 *
 * @param {SpinnerProps} props - Props for the Spinner component.
 * @returns {JSX.Element} SVG element representing the loading spinner.
 */
export const Spinner = ({
  size = Size.Default,
  disableAnimation = false,
  colorOverride,
  darkMode,
  className,
  'data-lgid': lgid,
  ...rest
}: SpinnerProps) => {
  const sizeInPx = getSpinnerSize(size);
  const { theme } = useDarkMode(darkMode);

  return (
    <svg
      className={cx(getSvgStyles({ size, disableAnimation }), className)}
      viewBox={`0 0 ${sizeInPx} ${sizeInPx}`}
      xmlns="http://www.w3.org/2000/svg"
      data-lgid={getLgIds(lgid).spinner}
      data-testid={getLgIds(lgid).spinner}
      {...rest}
    >
      <circle
        className={getCircleStyles({
          size,
          theme,
          colorOverride,
          disableAnimation,
        })}
        {...getCircleSVGArgs(size)}
      />
    </svg>
  );
};
