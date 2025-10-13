import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

import { LoadingSpinnerSize } from './LoadingSpinner.types';

const ROTATION_DURATION = 1500; // ms
const DASH_DURATION = 4000;

export const getSpinnerSize = (size: LoadingSpinnerSize | number): number => {
  switch (size) {
    case LoadingSpinnerSize.XSmall:
      return spacing[200];
    case LoadingSpinnerSize.Small:
      return spacing[400];
    case LoadingSpinnerSize.Default:
      return spacing[600];
    case LoadingSpinnerSize.Large:
      return spacing[1200];
    case LoadingSpinnerSize.XLarge:
      return spacing[1600];
    default:
      return size as number;
  }
};

const getStrokeWidth = (size: LoadingSpinnerSize | number): number => {
  switch (size) {
    case LoadingSpinnerSize.XSmall:
      return spacing[50];
    case LoadingSpinnerSize.Small:
      return spacing[50] + spacing[25];
    case LoadingSpinnerSize.Default:
      return spacing[100];
    case LoadingSpinnerSize.Large:
      return spacing[200];
    case LoadingSpinnerSize.XLarge:
      return spacing[200] + spacing[50];
    default:
      return size as number;
  }
};

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const getSvgStyles = (size: LoadingSpinnerSize | number) => css`
  width: ${getSpinnerSize(size)}px;
  height: ${getSpinnerSize(size)}px;
  animation: ${rotate} ${ROTATION_DURATION}ms linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: unset;
  }
`;

const getCircleAnimation = (size: LoadingSpinnerSize | number) => {
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
      stroke-dashoffset: 0
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
  return css`
    animation: ${dash} ${DASH_DURATION}ms linear infinite;

    @media (prefers-reduced-motion: reduce) {
      stroke-dasharray: ${percentToPx(75)}px, ${percentToPx(25)}px;
      animation: unset;
    }
  `;
};

export const getCircleStyles = ({
  size,
  theme,
  colorOverride,
}: {
  size: LoadingSpinnerSize | number;
  theme: Theme;
  colorOverride?: string;
}) => {
  const strokeWidth = getStrokeWidth(size);
  return cx(
    css`
      stroke: ${colorOverride ?? color[theme].icon.success.default};
      stroke-linecap: round;
      fill: none;
      stroke-width: ${strokeWidth};
    `,
    getCircleAnimation(size),
  );
};

export const getCircleSVGArgs = (size: LoadingSpinnerSize | number) => {
  const sizeInPx = getSpinnerSize(size);
  const strokeWidth = getStrokeWidth(size);

  return {
    cx: sizeInPx / 2,
    cy: sizeInPx / 2,
    r: (sizeInPx - strokeWidth) / 2,
  };
};
