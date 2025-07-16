import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { isDefined, Theme } from '@leafygreen-ui/lib';
import {
  color as colorToken,
  spacing as spacingToken,
} from '@leafygreen-ui/tokens';

import {
  barColorStyles,
  barSizeStyles,
  DEFAULT_WIDTH_ANIMATION_DURATION,
  getDeterminateAnimatedGradient,
  getIndeterminateGradient,
  INDETERMINATE_ANIMATION_DURATION_MS,
  indeterminateBarPositions,
  indeterminateBarWidthFractions,
  SHIMMER_ANIMATION_DURATION_MS,
  TEXT_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from './constants';
import { AnimationMode, Size, Variant } from './ProgressBar.types';

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
    transform: scaleX(${indeterminateBarWidthFractions.narrow});
  }
  25% {
    left: ${indeterminateBarPositions.quarter};
    transform: scaleX(${indeterminateBarWidthFractions.narrow});
  }
  47% {
    left: ${indeterminateBarPositions.half};
    transform: scaleX(${indeterminateBarWidthFractions.wide});
  }
  50% {
    left: ${indeterminateBarPositions.half};
    transform: scaleX(${indeterminateBarWidthFractions.wide});
  }
  53% {
    left: ${indeterminateBarPositions.half};
    transform: scaleX(${indeterminateBarWidthFractions.wide});
  }
  75% {
    left: ${indeterminateBarPositions.threeQuarters};
    transform: scaleX(${indeterminateBarWidthFractions.narrow});
  }
  100% {
    left: ${indeterminateBarPositions.end};
    transform: scaleX(${indeterminateBarWidthFractions.narrow});
  }
`;

const fadeFromWhiteKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const getContainerStyles = (className?: string) => {
  const baseStyles = css`
    display: flex;
    flex-direction: column;
    gap: ${spacingToken[100]}px;
    width: 100%;
  `;

  return cx(baseStyles, className);
};

export const headerStyles = css`
  display: flex;
  justify-content: space-between;
  gap: ${spacingToken[100]}px;
`;

export const truncatedTextStyles = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const hiddenStyles = css`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
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
  white-space: nowrap;

  color: ${disabled
    ? colorToken[theme].text.disabled.default
    : colorToken[theme].text.secondary.default};
`;

export const getHeaderIconStyles = ({
  theme,
  variant,
  disabled,
}: {
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
}) => css`
  margin-bottom: ${spacingToken[50]}px; // align icon with text baseline
  color: ${disabled
    ? colorToken[theme].icon.disabled.default
    : barColorStyles[theme][variant].icon};
`;

export const getAnimatedTextStyles = () => css`
  opacity: 0;
  animation: ${fadeFromWhiteKeyframes} ${TEXT_ANIMATION_DURATION}ms ease-in-out
    forwards;

  ${prefersReducedMotion(`
    animation: none;
    opacity: 1;
  `)}
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
  overflow: hidden;
`;

const getBaseBarFillStyles = () => css`
  position: relative;
  overflow: hidden;
  height: 100%;
  /* border-radius: inherit; */
`;

const getDeterminateFillStyles = ({
  theme,
  variant,
  disabled,
  width,
  widthAnimationDuration,
}: {
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
  width: number;
  widthAnimationDuration?: number;
}) => css`
  transform: scaleX(${width});
  transform-origin: 0 center;
  transition: transform
    ${widthAnimationDuration || DEFAULT_WIDTH_ANIMATION_DURATION}ms ease;
  background-color: ${disabled
    ? barColorStyles[theme].disabledBar
    : barColorStyles[theme][variant].bar};

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

const getDeterminateAnimatedFillStyles = ({
  theme,
  variant,
  disabled,
}: {
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
}) => {
  const selectedColorStyle = barColorStyles[theme][variant];
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

        ${prefersReducedMotion(`
          animation: none;
        `)}
      }
    `
  );
};

const getIndeterminateFillStyles = ({
  theme,
  variant,
}: {
  theme: Theme;
  variant: Variant;
}) => {
  const selectedColorStyle = barColorStyles[theme][variant];

  return css`
    width: 100%;
    background-color: transparent;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: ${indeterminateBarPositions.start};
      height: 100%;
      width: 100%;
      transform: scaleX(${indeterminateBarWidthFractions.narrow});
      transform-origin: 0 center;
      background: ${getIndeterminateGradient(selectedColorStyle)};
      animation: ${cycleKeyframes} ${INDETERMINATE_ANIMATION_DURATION_MS}ms
        linear infinite;

      ${prefersReducedMotion(`
        animation: none;
        left: ${indeterminateBarPositions.half};
      `)}
    }
  `;
};

export const transitioningFillStyles = css`
  opacity: 0;
  transform: scaleX(0);
  transition: opacity ${TRANSITION_ANIMATION_DURATION}ms ease-out,
    // wait until opacity has faded before reverting to width of 0
    transform 0ms ease-out ${TRANSITION_ANIMATION_DURATION - 100}ms;
`;

export const getBarFillStyles = ({
  animationMode,
  theme,
  variant,
  disabled,
  width,
  widthAnimationDuration,
}: {
  animationMode: AnimationMode;
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
  width?: number;
  widthAnimationDuration?: number;
}) => {
  const baseStyles = getBaseBarFillStyles();

  let addOnStyles;

  const determinate =
    isDefined(width) &&
    getDeterminateFillStyles({
      theme,
      variant,
      disabled,
      width,
      widthAnimationDuration,
    });

  const determinateAnimated = getDeterminateAnimatedFillStyles({
    theme,
    variant,
    disabled,
  });

  const indeterminate = getIndeterminateFillStyles({ theme, variant });

  switch (animationMode) {
    case AnimationMode.Transition:
      addOnStyles = [indeterminate, transitioningFillStyles];
      break;
    case AnimationMode.Indeterminate:
      addOnStyles = [indeterminate];
      break;
    case AnimationMode.DeterminateAnimated:
      addOnStyles = [determinate, determinateAnimated];
      break;
    case AnimationMode.DeterminatePlain:
    default:
      addOnStyles = [determinate];
      break;
  }

  return cx(baseStyles, ...addOnStyles);
};
