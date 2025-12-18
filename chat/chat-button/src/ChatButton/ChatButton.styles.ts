import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  InteractionState,
  Variant as ColorVariant,
} from '@leafygreen-ui/tokens';

import { Variant } from './ChatButton.types';

/** non-palette blue used for Chat branding */
const ALT_BLUE_COLOR = '#00D2FF';
const GRADIENT_BORDER_WIDTH = 1;
export const SHIMMER_TRANSITION_DURATION = 2000;

/**
 * Shimmer animation that moves from left to right continuously.
 */
const shimmerAnimation = keyframes`
  0% {
    transform: translateX(-75%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const getGradientStartColor = (darkMode: boolean) => {
  return palette.green[darkMode ? 'base' : 'dark1'];
};

const getGradientEndColor = (darkMode: boolean) => {
  return darkMode ? ALT_BLUE_COLOR : palette.blue.base;
};

const getBaseDefaultButtonStyles = (theme: Theme) => {
  const darkMode = theme === Theme.Dark;
  const gradientStart = getGradientStartColor(darkMode);
  const gradientEnd = getGradientEndColor(darkMode);

  return css`
    position: relative;
    isolation: isolate;
    border: none;
    background-color: ${color[theme].background[ColorVariant.Primary][
      InteractionState.Default
    ]};
    color: ${darkMode ? palette.white : palette.green.dark2};
    overflow: hidden;

    &:active,
    &:hover {
      background-color: ${color[theme].background[ColorVariant.Primary][
        InteractionState.Default
      ]};
      color: ${darkMode ? palette.white : palette.green.dark2};
      box-shadow: 0 0 0 3px
        ${color[theme].border[ColorVariant.OnSuccess][InteractionState.Hover]};
    }

    &:focus-visible {
      background-color: ${color[theme].background[ColorVariant.Primary][
        InteractionState.Default
      ]};
      color: ${darkMode ? palette.white : palette.green.dark2};
    }

    /* Create gradient border using pseudo-element */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd});
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      padding: ${GRADIENT_BORDER_WIDTH}px;
      pointer-events: none;
    }
  `;
};

const getShimmerStyles = (showAnimation: boolean) => css`
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      110deg,
      transparent 0%,
      transparent 35%,
      rgba(255, 255, 255, 0.8) 50%,
      transparent 65%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
    /* Mask to only show on border edges - hide the inner content area */
    /* Create a border frame by layering full rect with inner rect subtracted */
    mask-image: linear-gradient(white, white), linear-gradient(white, white);
    mask-position: 0 0, ${GRADIENT_BORDER_WIDTH}px ${GRADIENT_BORDER_WIDTH}px;
    mask-size: 100% 100%,
      calc(100% - ${GRADIENT_BORDER_WIDTH * 2}px)
        calc(100% - ${GRADIENT_BORDER_WIDTH * 2}px);
    mask-repeat: no-repeat;
    mask-composite: exclude;
    transform: translateX(-100%);
    opacity: ${showAnimation ? 1 : 0};
    animation: ${shimmerAnimation} ${SHIMMER_TRANSITION_DURATION}ms ease-in-out
      infinite;
  }
`;

const getDefaultButtonStyles = ({
  showAnimation,
  theme,
}: {
  showAnimation: boolean;
  theme: Theme;
}) => cx(getBaseDefaultButtonStyles(theme), getShimmerStyles(showAnimation));

export const getButtonStyles = ({
  className,
  disabled,
  showAnimation,
  theme,
  variant,
}: {
  className?: string;
  disabled: boolean;
  showAnimation: boolean;
  theme: Theme;
  variant: Variant;
}) =>
  cx(
    {
      [getDefaultButtonStyles({ showAnimation, theme })]:
        variant === Variant.Default && !disabled,
    },
    className,
  );
