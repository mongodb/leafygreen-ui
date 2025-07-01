import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color as colorToken,
  spacing as spacingToken,
} from '@leafygreen-ui/tokens';

import { AnimationMode, Color, Size } from './ProgressBar.types';
import { getPercentage } from './ProgressBar.utils';

export const FADEOUT_DURATION = 500;

const opacityAlphaChannels = {
  50: '80',
  75: 'BF',
  100: 'FF',
};

const fadePalette = {
  blue: '#C3E7FE',
  green: '#C0FAE6',
};

const progressBarSizeStyles = {
  [Size.Small]: {
    height: '4px',
    borderRadius: borderRadius[100] + 'px',
  },
  [Size.Default]: {
    height: '8px',
    borderRadius: borderRadius[100] + 'px',
  },
  [Size.Large]: {
    height: '16px',
    borderRadius: borderRadius[200] + 'px',
  },
};

const progressBarColorStyles = {
  [Theme.Light]: {
    track: palette.gray.light2,
    disabledBar: palette.gray.light1,

    [Color.Blue]: {
      bar: palette.blue.base,
      icon: palette.blue.base,
      shimmerFade: `${fadePalette.blue}${opacityAlphaChannels[50]}`,
    },
    [Color.Green]: {
      bar: palette.green.dark1,
      icon: palette.green.dark1,
      shimmerFade: `${fadePalette.green}${opacityAlphaChannels[50]}`,
    },
    [Color.Yellow]: {
      bar: palette.yellow.base,
      icon: palette.yellow.dark2,
    },
    [Color.Red]: {
      bar: palette.red.base,
      icon: palette.red.base,
    },
  },
  [Theme.Dark]: {
    track: palette.gray.dark2,
    disabledBar: palette.gray.dark1,

    [Color.Blue]: {
      bar: palette.blue.light1,
      icon: palette.blue.light1,
      shimmerFade: `${fadePalette.blue}${opacityAlphaChannels[75]}`,
    },
    [Color.Green]: {
      bar: palette.green.base,
      icon: palette.green.base,
      shimmerFade: `${fadePalette.green}${opacityAlphaChannels[75]}`,
    },
    [Color.Yellow]: {
      bar: palette.yellow.base,
      icon: palette.yellow.base,
    },
    [Color.Red]: {
      bar: palette.red.light1,
      icon: palette.red.light1,
    },
  },
};

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
    : progressBarColorStyles[theme][color].icon};
`;

export const getBarTrackStyles = ({
  theme,
  size,
}: {
  theme: Theme;
  size: Size;
}) => css`
  width: 100%;
  height: ${progressBarSizeStyles[size].height};
  border-radius: ${progressBarSizeStyles[size].borderRadius};
  background-color: ${progressBarColorStyles[theme].track};
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
  enableAnimation,
}: {
  theme: Theme;
  color: Color;
  disabled?: boolean;
  width: number;
  enableAnimation: boolean;
}) => {
  const variantStyles = progressBarColorStyles[theme][color];
  const hasAnimation =
    !disabled && enableAnimation && 'shimmerFade' in variantStyles;

  return css`
    width: ${width}%;
    transition: width 0.5s ease-in-out;
    background-color: ${disabled
      ? progressBarColorStyles[theme].disabledBar
      : progressBarColorStyles[theme][color].bar};
    ${hasAnimation &&
    css`
      background-color: transparent;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(
          90deg,
          ${variantStyles.bar} 0%,
          ${variantStyles.shimmerFade} 50%,
          ${variantStyles.bar} 100%
        );
        background-size: 200% 100%;
        animation: shimmer 3s linear infinite;
      }
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}
  `;
};

const getIndeterminateBarFillStyles = ({
  theme,
  color,
}: {
  theme: Theme;
  color: Color;
}) => {
  const variantStyles = progressBarColorStyles[theme][color];

  return css`
    width: 100%;
    background-color: transparent;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -33%;
      height: 100%;
      width: 33%;
      background: linear-gradient(
        90deg,
        ${palette.transparent} 0%,
        ${variantStyles.bar}${opacityAlphaChannels[75]} 25%,
        ${variantStyles.bar}${opacityAlphaChannels[100]} 50%,
        ${variantStyles.bar}${opacityAlphaChannels[75]} 75%,
        ${palette.transparent} 100%
      );
      animation: cycle 1.5s linear infinite;
    }
    @keyframes cycle {
      0% {
        left: -33%;
        width: 33%;
      }
      25% {
        left: 0%;
        width: 33%;
      }
      50% {
        left: 17%;
        width: 66%;
      }
      75% {
        left: 67%;
        width: 33%;
      }
      100% {
        left: 100%;
        width: 33%;
      }
    }
  `;
};

export const getFadeOutBarFillStyles = () => css`
  opacity: 0;
  width: 0%;
  transition: opacity ${FADEOUT_DURATION}ms ease-out,
    width 100ms ease-out ${FADEOUT_DURATION - 100}ms;
`;

export const getBarFillStyles = ({
  animationMode,
  theme,
  color,
  disabled,
  value = 0,
  maxValue,
  enableAnimation = false,
}: {
  animationMode: AnimationMode;
  theme: Theme;
  color: Color;
  disabled?: boolean;
  value?: number;
  maxValue?: number;
  enableAnimation?: boolean;
}) => {
  let typedBarFillStyles;

  switch (animationMode) {
    case AnimationMode.Transition:
      typedBarFillStyles = cx(
        getIndeterminateBarFillStyles({ theme, color }),
        getFadeOutBarFillStyles(),
      );
      break;

    case AnimationMode.Indeterminate:
      typedBarFillStyles = getIndeterminateBarFillStyles({ theme, color });
      break;

    case AnimationMode.Determinate:
      typedBarFillStyles = getDeterminateBarFillStyles({
        theme,
        color,
        disabled,
        width: getPercentage(value, maxValue),
        enableAnimation,
      });
      break;
  }

  return cx(getBaseBarFillStyles(), typedBarFillStyles);
};
