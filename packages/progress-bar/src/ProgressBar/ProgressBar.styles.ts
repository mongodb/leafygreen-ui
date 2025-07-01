import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color as colorToken,
  spacing as spacingToken,
} from '@leafygreen-ui/tokens';

import { Color, Size } from './ProgressBar.types';
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

const progressBarColorStyles = {
  [Theme.Light]: {
    track: palette.gray.light2,
    disabledBar: palette.gray.light1,

    [Color.Blue]: {
      bar: palette.blue.base,
      icon: palette.blue.base,
    },
    [Color.Green]: {
      bar: palette.green.dark1,
      icon: palette.green.dark1,
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
    },
    [Color.Green]: {
      bar: palette.green.base,
      icon: palette.green.base,
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

const getBaseBarFillStyles = ({
  theme,
  color,
  disabled,
}: {
  theme: Theme;
  color: Color;
  disabled?: boolean;
}) => css`
  height: 100%;
  border-radius: inherit;
  background-color: ${disabled
    ? progressBarColorStyles[theme].disabledBar
    : progressBarColorStyles[theme][color].bar};
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
  color,
  disabled,
  isIndeterminate,
  value,
  maxValue,
}: {
  theme: Theme;
  color: Color;
  isIndeterminate: boolean;
  disabled?: boolean;
  value?: number;
  maxValue?: number;
}) => {
  let typedBarFillStyles;

  if (isIndeterminate) typedBarFillStyles = getIndeterminateBarFillStyles();

  if (value && maxValue)
    typedBarFillStyles = getDeterminateBarFillStyles(
      getPercentage(value, maxValue),
    );

  return cx(
    getBaseBarFillStyles({ theme, color, disabled }),
    typedBarFillStyles,
  );
};
