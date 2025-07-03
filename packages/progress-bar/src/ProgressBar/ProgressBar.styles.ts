import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color as colorToken,
  spacing as spacingToken,
} from '@leafygreen-ui/tokens';

import {
  INDETERMINATE_ANIMATION_DURATION_MS,
  SHIMMER_ANIMATION_DURATION_MS,
  TRANSITION_ANIMATION_DURATION,
  WIDTH_ANIMATION_DURATION,
} from '../constants';

import { AnimationMode, Color, Size } from './ProgressBar.types';
import { getPercentage } from './ProgressBar.utils';

const opacityAlphaChannels = {
  50: '80',
  75: 'BF',
  100: 'FF',
};

const fadePalette = {
  blue: '#C3E7FE',
  green: '#C0FAE6',
};

const barSizeStyles = {
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

const barColorStyles = {
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
    left: -33%;
    width: 33%;
  }
  25% {
    left: 0%;
    width: 33%;
  }
  47% {
    left: 17%;
    width: 66%;
  }
  50% {
    left: 17%;
    width: 66%;
  }
  53% {
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

const getAnimatedDeterminateBarFillStyles = ({
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
        background: linear-gradient(
          90deg,
          ${selectedColorStyle.bar} 0%,
          ${selectedColorStyle.shimmerFade} 50%,
          ${selectedColorStyle.bar} 100%
        );
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
      left: -33%;
      height: 100%;
      width: 33%;
      background: linear-gradient(
        90deg,
        ${palette.transparent} 0%,
        ${selectedColorStyle.bar}${opacityAlphaChannels[75]} 25%,
        ${selectedColorStyle.bar}${opacityAlphaChannels[100]} 50%,
        ${selectedColorStyle.bar}${opacityAlphaChannels[75]} 75%,
        ${palette.transparent} 100%
      );
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

  const animatedDeterminate = getAnimatedDeterminateBarFillStyles({
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
    case AnimationMode.AnimatedDeterminate:
      addOnStyles = cx(determinate, animatedDeterminate);
      break;
    case AnimationMode.BaseDeterminate:
    default:
      addOnStyles = determinate;
      break;
  }

  return cx(baseStyles, addOnStyles);
};
