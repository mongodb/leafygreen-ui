import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { descriptionThemeColor } from '../LoadingIndicator.styles';
import { getLgIds } from '../utils/getLgIds';

import { getSpinnerSize } from './constants';
import {
  getCircleStyles,
  getCircleSVGArgs,
  getSvgStyles,
  getWrapperStyles,
} from './Spinner.styles';
import { SpinnerDirection, SpinnerProps } from './Spinner.types';

/**
 * SVG-based spinner loading indicator
 *
 * Provide the `size` prop to define a standard size,
 * or provide a custom number in px
 *
 * @param {SpinnerProps} props - Props for the Spinner component.
 * @returns {JSX.Element} Div element containing the loading spinner SVG.
 */
export const Spinner = ({
  size = Size.Default,
  disableAnimation = false,
  colorOverride,
  darkMode,
  className,
  description,
  direction = SpinnerDirection.Vertical,
  baseFontSize: baseFontSizeProp,
  svgProps,
  'data-lgid': lgid,
  ...rest
}: SpinnerProps) => {
  const sizeInPx = getSpinnerSize(size);
  const { theme } = useDarkMode(darkMode);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

  return (
    <div
      className={cx(getWrapperStyles({ direction, size }), className)}
      data-lgid={getLgIds(lgid).spinner}
      data-testid={getLgIds(lgid).spinner}
      {...rest}
    >
      <svg
        className={cx(
          getSvgStyles({ size, disableAnimation }),
          svgProps?.className,
        )}
        viewBox={`0 0 ${sizeInPx} ${sizeInPx}`}
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}
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
      {description && (
        <Body
          className={descriptionThemeColor[theme]}
          baseFontSize={baseFontSize}
        >
          {description}
        </Body>
      )}
    </div>
  );
};
