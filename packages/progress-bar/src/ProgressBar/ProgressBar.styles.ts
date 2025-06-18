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
    },
    [Variant.Success]: {
      barColor: palette.green.dark1,
      iconColor: palette.green.dark1,
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
    },
    [Variant.Success]: {
      barColor: palette.green.base,
      iconColor: palette.green.base,
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

export const headerValueStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getHeaderValueStyles = (theme: Theme, disabled?: boolean) => css`
  color: ${disabled
    ? color[theme].text.disabled.default
    : color[theme].text.secondary.default};
`;

export const headerIconStyles = css`
  margin-bottom: ${spacing[50]}px; // align icon with text baseline
`;

export const getHeaderIconStyles = (
  theme: Theme,
  variant: ProgressBarVariant,
  disabled?: boolean,
) => css`
  color: ${disabled
    ? color[theme].icon.disabled.default
    : progressBarVariantStyles[theme][variant].iconColor};
`;

export const progressBarTrackStyles = css`
  width: 100%;
`;

export const getProgressBarTrackStyles = (
  theme: Theme,
  size: ProgressBarSize,
) => css`
  height: ${progressBarSizeStyles[size].height};
  border-radius: ${progressBarSizeStyles[size].borderRadius};
  background-color: ${progressBarVariantStyles[theme].trackColor};
`;

export const progressBarFillStyles = css`
  height: 100%;
`;

export const getProgressBarFillStyles = (
  theme: Theme,
  variant: ProgressBarVariant,
  disabled?: boolean,
) => css`
  border-radius: inherit;
  background-color: ${disabled
    ? progressBarVariantStyles[theme].disabledBarColor
    : progressBarVariantStyles[theme][variant].barColor};
`;

export const getDeterminateProgressBarFillStyles = (progress: number) => css`
  width: ${progress}%;
  // requires additional animation
`;

export const indeterminateProgressBarFillStyles = css`
  width: 100%; // temporary
  // requires additional animation
`;
