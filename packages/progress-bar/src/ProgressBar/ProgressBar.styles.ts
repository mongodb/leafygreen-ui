import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  Size,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { ProgressBarSize, ProgressBarVariant } from './ProgressBar.types';
import { variantsWithAnimation } from './ProgressBar.utils';

const OPACITY_50 = '80';
const OPACITY_75 = 'BF';
const OPACITY_100 = 'FF';

const customPalette = {
  blueFade: '#C3E7FE',
  greenFade: '#C0FAE6',
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
      shimmerFadeColor: customPalette.blueFade + OPACITY_50,
    },
    [Variant.Success]: {
      barColor: palette.green.dark1,
      iconColor: palette.green.dark1,
      shimmerFadeColor: customPalette.greenFade + OPACITY_50,
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
      shimmerFadeColor: customPalette.blueFade + OPACITY_75,
    },
    [Variant.Success]: {
      barColor: palette.green.base,
      iconColor: palette.green.base,
      shimmerFadeColor: customPalette.greenFade + OPACITY_75,
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
  variant: ProgressBarVariant;
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
  size: ProgressBarSize;
}) => css`
  width: 100%;
  height: ${progressBarSizeStyles[size].height};
  border-radius: ${progressBarSizeStyles[size].borderRadius};
  background-color: ${progressBarVariantStyles[theme].trackColor};
`;

export const getBarFillStyles = () => css`
  position: relative;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
`;

export const getDeterminateBarFillStyles = ({
  theme,
  variant,
  disabled,
  progress,
  enableAnimation,
}: {
  theme: Theme;
  variant: ProgressBarVariant;
  disabled: boolean;
  progress: number;
  enableAnimation?: boolean;
}) => {
  const variantStyles = progressBarVariantStyles[theme][variant];
  const hasAnimation = 'shimmerFadeColor' in variantStyles;

  return css`
    width: ${progress}%;
    transition: width 0.5s ease-in-out;

    background-color: ${disabled
      ? progressBarVariantStyles[theme].disabledBarColor
      : progressBarVariantStyles[theme][variant].barColor};

    ${!disabled &&
    enableAnimation &&
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

export const getIndeterminateBarFillStyles = ({
  theme,
  variant,
}: {
  theme: Theme;
  variant: ProgressBarVariant;
}) => {
  const variantStyles = progressBarVariantStyles[theme][variant];
  const hasAnimation = variantsWithAnimation.includes(variant);

  return (
    hasAnimation &&
    css`
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
          ${variantStyles.barColor}${OPACITY_75} 25%,
          ${variantStyles.barColor}${OPACITY_100} 50%,
          ${variantStyles.barColor}${OPACITY_75} 75%,
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
    `
  );
};
