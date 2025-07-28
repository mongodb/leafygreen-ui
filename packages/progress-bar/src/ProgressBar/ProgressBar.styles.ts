import { prefersReducedMotion } from '@leafygreen-ui/a11y';
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
  indeterminateLeftOffset,
  indeterminateWidth,
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
    left: ${indeterminateLeftOffset.start};
    width: ${indeterminateWidth.narrow};
  }
  25% {
    left: ${indeterminateLeftOffset.quarter};
    width: ${indeterminateWidth.narrow};
  }
  47% {
    left: ${indeterminateLeftOffset.half};
    width: ${indeterminateWidth.wide};
  }
  50% {
    left: ${indeterminateLeftOffset.half};
    width: ${indeterminateWidth.wide};
  }
  53% {
    left: ${indeterminateLeftOffset.half};
    width: ${indeterminateWidth.wide};
  }
  75% {
    left: ${indeterminateLeftOffset.threeQuarters};
    width: ${indeterminateWidth.narrow};
  }
  100% {
    left: ${indeterminateLeftOffset.end};
    width: ${indeterminateWidth.narrow};
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
`;

const getBaseBarFillStyles = () => css`
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: inherit;
`;

const getDeterminateFillStyles = ({
  theme,
  variant,
  disabled,
}: {
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
}) => css`
  width: var(--width);
  transition: var(--width-animation-duration) ease;

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
      left: ${indeterminateLeftOffset.start};
      height: 100%;
      width: ${indeterminateWidth.narrow};
      background: ${getIndeterminateGradient(selectedColorStyle)};
      animation: ${cycleKeyframes} ${INDETERMINATE_ANIMATION_DURATION_MS}ms
        linear infinite;

      ${prefersReducedMotion(`
        animation: none;
        left: ${indeterminateLeftOffset.half};
      `)}
    }
  `;
};

export const transitioningFillStyles = css`
  opacity: 0;
  width: 0%;
  transition: opacity ${TRANSITION_ANIMATION_DURATION}ms ease-out,
    width 100ms ease-out ${TRANSITION_ANIMATION_DURATION - 100}ms;
`;

export const getBarFillStyles = ({
  animationMode,
  theme,
  variant,
  disabled,
}: {
  animationMode: AnimationMode;
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
}) => {
  const baseStyles = getBaseBarFillStyles();

  let addOnStyles;

  const determinate = getDeterminateFillStyles({
    theme,
    variant,
    disabled,
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
