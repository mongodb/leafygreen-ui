import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { borderRadius, color, spacing } from '@leafygreen-ui/tokens';

import { AnimationMode, Size, Variant } from './ProgressBar.types';
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

const progressBarVariantStyles = {
  [Theme.Light]: {
    trackColor: palette.gray.light2,
    disabledBarColor: palette.gray.light1,

    [Variant.Info]: {
      barColor: palette.blue.base,
      iconColor: palette.blue.base,
      shimmerFadeColor: `${fadePalette.blue}${opacityAlphaChannels[50]}`,
    },
    [Variant.Success]: {
      barColor: palette.green.dark1,
      iconColor: palette.green.dark1,
      shimmerFadeColor: `${fadePalette.green}${opacityAlphaChannels[50]}`,
    },
    [Variant.Warning]: {
      barColor: palette.yellow.base,
      iconColor: palette.yellow.dark2,
    },
    [Variant.Error]: {
      barColor: palette.red.base,
      iconColor: palette.red.base,
    },
  },
  [Theme.Dark]: {
    trackColor: palette.gray.dark2,
    disabledBarColor: palette.gray.dark1,

    [Variant.Info]: {
      barColor: palette.blue.light1,
      iconColor: palette.blue.light1,
      shimmerFadeColor: `${fadePalette.blue}${opacityAlphaChannels[75]}`,
    },
    [Variant.Success]: {
      barColor: palette.green.base,
      iconColor: palette.green.base,
      shimmerFadeColor: `${fadePalette.green}${opacityAlphaChannels[75]}`,
    },
    [Variant.Warning]: {
      barColor: palette.yellow.base,
      iconColor: palette.yellow.base,
    },
    [Variant.Error]: {
      barColor: palette.red.light1,
      iconColor: palette.red.light1,
    },
  },
};

export const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[100]}px;
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
  gap: ${spacing[100]}px;
  color: ${disabled
    ? color[theme].text.disabled.default
    : color[theme].text.secondary.default};
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
  margin-bottom: ${spacing[50]}px; // align icon with text baseline
  color: ${disabled
    ? color[theme].icon.disabled.default
    : progressBarVariantStyles[theme][variant].iconColor};
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
  background-color: ${progressBarVariantStyles[theme].trackColor};
`;

const getBaseBarFillStyles = () => css`
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: inherit;
`;

const getDeterminateBarFillStyles = ({
  theme,
  variant,
  disabled,
  width,
  enableAnimation,
}: {
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
  width: number;
  enableAnimation: boolean;
}) => {
  const variantStyles = progressBarVariantStyles[theme][variant];
  const hasAnimation =
    !disabled && enableAnimation && 'shimmerFadeColor' in variantStyles;

  return css`
    width: ${width}%;
    transition: width 0.5s ease-in-out;
    background-color: ${disabled
      ? progressBarVariantStyles[theme].disabledBarColor
      : progressBarVariantStyles[theme][variant].barColor};

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
          ${variantStyles.barColor} 0%,
          ${variantStyles.shimmerFadeColor} 50%,
          ${variantStyles.barColor} 100%
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
  variant,
}: {
  theme: Theme;
  variant: Variant;
}) => {
  const variantStyles = progressBarVariantStyles[theme][variant];

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
        ${variantStyles.barColor}${opacityAlphaChannels[75]} 25%,
        ${variantStyles.barColor}${opacityAlphaChannels[100]} 50%,
        ${variantStyles.barColor}${opacityAlphaChannels[75]} 75%,
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
  variant,
  disabled,
  value = 0,
  maxValue,
  enableAnimation = false,
}: {
  animationMode: AnimationMode;
  theme: Theme;
  variant: Variant;
  disabled?: boolean;
  value?: number;
  maxValue?: number;
  enableAnimation?: boolean;
}) => {
  let typedBarFillStyles;

  switch (animationMode) {
    case AnimationMode.Transition:
      typedBarFillStyles = cx(
        getIndeterminateBarFillStyles({ theme, variant }),
        getFadeOutBarFillStyles(),
      );
      break;

    case AnimationMode.Indeterminate:
      typedBarFillStyles = getIndeterminateBarFillStyles({ theme, variant });
      break;

    case AnimationMode.Determinate:
      typedBarFillStyles = getDeterminateBarFillStyles({
        theme,
        variant,
        disabled,
        width: getPercentage(value, maxValue),
        enableAnimation,
      });
      break;
  }

  return cx(getBaseBarFillStyles(), typedBarFillStyles);
};
