import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, Size } from '@leafygreen-ui/tokens';

import {
  DASH_DURATION,
  getHorizontalGap,
  getPadding,
  getSpinnerSize,
  getStrokeWidth,
  getVerticalGap,
  ROTATION_DURATION,
} from './constants';
import { SpinnerDirection } from './Spinner.types';

/**
 * Defines the outer SVG element keyframes
 */
const rotate = keyframes`
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

/**
 * Returns the outer SVG element styles
 */
export const getSvgStyles = ({
  size,
  disableAnimation,
}: {
  size: Size | number;
  disableAnimation?: boolean;
}) =>
  cx(
    css`
      width: ${getSpinnerSize(size)}px;
      height: ${getSpinnerSize(size)}px;
      padding: ${getPadding(size)}px;
    `,
    {
      [css`
        animation: ${rotate} ${ROTATION_DURATION}ms linear infinite;
        @media (prefers-reduced-motion: reduce) {
          animation: unset;
        }
      `]: !disableAnimation,
    },
  );

/**
 * Defines the SVG Circle animation keyframes
 */
const getCircleAnimation = (
  size: Size | number,
  disableAnimation?: boolean,
) => {
  const sizeInPx = getSpinnerSize(size);
  const strokeWidth = getStrokeWidth(size);
  const circumference = (sizeInPx - strokeWidth) * Math.PI;

  /** convert a percent of circumference to a px value */
  const percentToPx = (pct: number) => {
    return (pct / 100) * circumference;
  };

  const dash = keyframes`
    // Collapsed @ 0
    0% {
      stroke-dasharray: ${percentToPx(0)}px, ${percentToPx(100)}px;
      stroke-dashoffset: 0;
    }
    // Expanded @ 0
    12.5% {
      stroke-dasharray: ${percentToPx(25)}px, ${percentToPx(75)}px;
      stroke-dashoffset: 0;
    }
    // Collapsed @ 90deg origin
    25% {
      stroke-dasharray: ${percentToPx(0)}px, ${percentToPx(100)}px;
      stroke-dashoffset: -${percentToPx(25)}px;
    }
    // Expanded @ 90deg origin
    37.5% {
      stroke-dasharray: ${percentToPx(25)}px, ${percentToPx(75)}px;
      stroke-dashoffset: -${percentToPx(25)}px;
    }
    // Collapsed @ 180deg origin
    50% {
      stroke-dasharray: ${percentToPx(0)}px, ${percentToPx(100)}px;
      stroke-dashoffset: -${percentToPx(50)}px;
    }
    // Expanded @ 180deg origin
    62.5% {
      stroke-dasharray: ${percentToPx(25)}px, ${percentToPx(75)}px;
      stroke-dashoffset: -${percentToPx(50)}px;
    }
    // Collapsed @ 270deg origin
    75% {
      stroke-dasharray: ${percentToPx(0)}px, ${percentToPx(100)}px;
      stroke-dashoffset: -${percentToPx(75)}px;
    }
    // Expanded @ 270deg origin
    87.5% {
      stroke-dasharray: ${percentToPx(25)}px, ${percentToPx(75)}px;
      stroke-dashoffset: -${percentToPx(75)}px;
    }
    // Collapsed @ 0/360deg origin
    100% {
      stroke-dasharray: ${percentToPx(0)}px, ${percentToPx(100)}px;
      stroke-dashoffset: -${percentToPx(100)}px;
    }
  `;
  return cx({
    [css`
      animation: ${dash} ${DASH_DURATION}ms linear infinite;

      @media (prefers-reduced-motion: reduce) {
        stroke-dasharray: ${percentToPx(75)}px, ${percentToPx(25)}px;
        animation: unset;
      }
    `]: !disableAnimation,
    [css`
      stroke-dasharray: ${percentToPx(75)}px, ${percentToPx(25)}px;
    `]: disableAnimation,
  });
};

/**
 * Returns the SVG Circle styles
 */
export const getCircleStyles = ({
  size,
  theme,
  colorOverride,
  disableAnimation,
}: {
  size: Size | number;
  theme: Theme;
  colorOverride?: string;
  disableAnimation?: boolean;
}) => {
  const strokeWidth = getStrokeWidth(size);
  return cx(
    css`
      stroke: ${colorOverride ?? color[theme].icon.success.default};
      stroke-linecap: round;
      fill: none;
      stroke-width: ${strokeWidth};
    `,
    getCircleAnimation(size, disableAnimation),
  );
};

/**
 * Returns the SVG Circle args (`cx`, `cy`, `r`)
 */
export const getCircleSVGArgs = (size: Size | number) => {
  const sizeInPx = getSpinnerSize(size);
  const strokeWidth = getStrokeWidth(size);

  return {
    cx: sizeInPx / 2,
    cy: sizeInPx / 2,
    r: (sizeInPx - strokeWidth) / 2,
  };
};

/**
 * Returns the wrapper div styles based on direction and size
 */
export const getWrapperStyles = ({
  direction,
  size,
}: {
  direction: SpinnerDirection;
  size: Size | number;
}) =>
  cx(
    css`
      display: flex;
      align-items: center;
    `,
    {
      [css`
        flex-direction: column;
        gap: ${getVerticalGap(size)}px;
      `]: direction === SpinnerDirection.Vertical,
      [css`
        flex-direction: row;
        gap: ${getHorizontalGap(size)}px;
      `]: direction === SpinnerDirection.Horizontal,
    },
  );
