import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color as colorToken,
  spacing as spacingToken,
} from '@leafygreen-ui/tokens';

import {
  barColorStyles,
  barSizeStyles,
  getDeterminateAnimatedGradient,
  getIndeterminateGradient,
  INDETERMINATE_ANIMATION_DURATION_MS,
  indeterminateBarPositions,
  indeterminateBarWidths,
  SHIMMER_ANIMATION_DURATION_MS,
  TEXT_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
  WIDTH_ANIMATION_DURATION,
} from './ProgressBar.constants';
import { AnimationMode, Color, Size } from './ProgressBar.types';
import { getPercentage } from './ProgressBar.utils';

const shimmerKeyframes = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const cycleKeyframes = keyframes`
  0% {
    left: ${indeterminateBarPositions.start};
    width: ${indeterminateBarWidths.narrow};
  }
  25% {
    left: ${indeterminateBarPositions.quarter};
    width: ${indeterminateBarWidths.narrow};
  }
  47% {
    left: ${indeterminateBarPositions.half};
    width: ${indeterminateBarWidths.wide};
  }
  50% {
    left: ${indeterminateBarPositions.half};
    width: ${indeterminateBarWidths.wide};
  }
  53% {
    left: ${indeterminateBarPositions.half};
    width: ${indeterminateBarWidths.wide};
  }
  75% {
    left: ${indeterminateBarPositions.threeQuarters};
    width: ${indeterminateBarWidths.narrow};
  }
  100% {
    left: ${indeterminateBarPositions.end};
    width: ${indeterminateBarWidths.narrow};
  }
`;

const fadeFromWhiteKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacingToken[100]}px;
  width: 100%;
`;

export const headerStyles = css`
  display: flex;
  justify-content: space-between;
`;

export const getHeaderValueStyles = ({
  theme,
  disabled,
}: {
  theme: Theme;
  disabled?: boolean;
}) => css`
  display: flex;
  align-items: center;
  gap: ${spacingToken[100]}px;
  color: ${disabled
    ? colorToken[theme].text.disabled.default
    : colorToken[theme].text.secondary.default};
`;

export const getHeaderIconStyles = ({
  theme,
  color,
  disabled,
}: {
  theme: Theme;
  color: Color;
  disabled?: boolean;
}) => css`
  margin-bottom: ${spacingToken[50]}px; // align icon with text baseline
  color: ${disabled
    ? colorToken[theme].icon.disabled.default
    : barColorStyles[theme][color].icon};
`;

export const getAnimatedTextStyles = () => css`
  opacity: 0;
  animation: ${fadeFromWhiteKeyframes} ${TEXT_ANIMATION_DURATION}ms ease-in-out
    forwards;
`;

export const getBarTrackStyles = ({
  theme,
  size,
}: {
  theme: Theme;
  size: Size;
}) => css`
  width: 100%;
  height: ${barSizeStyles[size].height};
  border-radius: ${barSizeStyles[size].borderRadius};
  background-color: ${barColorStyles[theme].track};
`;

const getBaseBarFillStyles = () => css`
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: inherit;
`;

const getDeterminateBarFillStyles = ({
  theme,
  color,
  disabled,
  width,
}: {
  theme: Theme;
  color: Color;
  disabled?: boolean;
  width: number;
}) => css`
  width: ${width}%;
  transition: width ${WIDTH_ANIMATION_DURATION}ms ease-in-out;
  background-color: ${disabled
    ? barColorStyles[theme].disabledBar
    : barColorStyles[theme][color].bar};
`;

const getDeterminateAnimatedBarFillStyles = ({
  theme,
  color,
  disabled,
}: {
  theme: Theme;
  color: Color;
  disabled?: boolean;
}) => {
  const selectedColorStyle = barColorStyles[theme][color];
  const hasAnimation = !disabled && 'shimmerFade' in selectedColorStyle;

  return (
    hasAnimation &&
    css`
      background-color: transparent;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: ${getDeterminateAnimatedGradient(selectedColorStyle)};
        background-size: 200% 100%;
        animation: ${shimmerKeyframes} ${SHIMMER_ANIMATION_DURATION_MS}ms linear
          infinite;
      }
    `
  );
};

const getIndeterminateBarFillStyles = ({
  theme,
  color,
}: {
  theme: Theme;
  color: Color;
}) => {
  const selectedColorStyle = barColorStyles[theme][color];

  return css`
    width: 100%;
    background-color: transparent;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: ${indeterminateBarPositions.start};
      height: 100%;
      width: ${indeterminateBarWidths.narrow};
      background: ${getIndeterminateGradient(selectedColorStyle)};
      animation: ${cycleKeyframes} ${INDETERMINATE_ANIMATION_DURATION_MS}ms
        linear infinite;
    }
  `;
};

export const getTransitioningBarFillStyles = () => css`
  opacity: 0;
  width: 0%;
  transition: opacity ${TRANSITION_ANIMATION_DURATION}ms ease-out,
    width 100ms ease-out ${TRANSITION_ANIMATION_DURATION - 100}ms;
`;

export const getBarFillStyles = ({
  animationMode,
  theme,
  color,
  disabled,
  value = 0,
  maxValue,
}: {
  animationMode: AnimationMode;
  theme: Theme;
  color: Color;
  disabled?: boolean;
  value?: number;
  maxValue?: number;
}) => {
  const baseStyles = getBaseBarFillStyles();

  let addOnStyles;

  const determinate = getDeterminateBarFillStyles({
    theme,
    color,
    disabled,
    width: getPercentage(value, maxValue),
  });

  const determinateAnimated = getDeterminateAnimatedBarFillStyles({
    theme,
    color,
    disabled,
  });

  const indeterminate = getIndeterminateBarFillStyles({ theme, color });

  switch (animationMode) {
    case AnimationMode.Transition:
      addOnStyles = cx(indeterminate, getTransitioningBarFillStyles());
      break;
    case AnimationMode.Indeterminate:
      addOnStyles = indeterminate;
      break;
    case AnimationMode.DeterminateAnimated:
      addOnStyles = cx(determinate, determinateAnimated);
      break;
    case AnimationMode.DeterminateBase:
    default:
      addOnStyles = determinate;
      break;
  }

  return cx(baseStyles, addOnStyles);
};
