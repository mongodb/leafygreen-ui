import { css, cx } from '@leafygreen-ui/emotion';
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
import { getPercentage } from './ProgressBar.utils';

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

const getBaseBarFillStyles = ({
  theme,
  variant,
  disabled,
}: {
  theme: Theme;
  variant: ProgressBarVariant;
  disabled?: boolean;
}) => css`
  height: 100%;
  border-radius: inherit;
  background-color: ${disabled
    ? progressBarVariantStyles[theme].disabledBarColor
    : progressBarVariantStyles[theme][variant].barColor};
`;

const getDeterminateBarFillStyles = (progress: number) => css`
  width: ${progress}%;
  // requires additional animation
`;

const getIndeterminateBarFillStyles = () => css`
  width: 100%; // temporary
  // requires additional animation
`;

export const getBarFillStyles = ({
  theme,
  variant,
  disabled,
  isDeterminate,
  value,
  maxValue,
}: {
  theme: Theme;
  variant: ProgressBarVariant;
  isDeterminate: boolean;
  disabled?: boolean;
  value?: number;
  maxValue?: number;
}) => {
  let typedBarFillStyles;

  if (!isDeterminate) typedBarFillStyles = getIndeterminateBarFillStyles();

  if (value && maxValue)
    typedBarFillStyles = getDeterminateBarFillStyles(
      getPercentage(value, maxValue),
    );

  return cx(
    getBaseBarFillStyles({ theme, variant, disabled }),
    typedBarFillStyles,
  );
};
