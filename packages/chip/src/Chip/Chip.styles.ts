import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration, typeScales } from '@leafygreen-ui/tokens';

import { Size, Variant } from './Chip.types';

/**
 * The line-height of the chip.
 */
export const lineHeight: Record<Size, number> = {
  [Size.Default]: 18,
  [Size.Large]: 20,
};

/**
 * The font-size of the combobox.
 */
export const fontSize: Record<Size, number> = {
  [Size.Default]: typeScales.body1.fontSize,
  [Size.Large]: typeScales.body2.fontSize,
};

/**
 * Vertical padding on a chip (in px)
 */
export const chipWrapperPaddingY = {
  [Size.Default]: 0,
  [Size.Large]: 2,
} as const;

export const variantColor: Record<
  Variant,
  Record<
    Theme,
    {
      color: string;
      bgColor: string;
      focusWithinBgColor: string;
    }
  >
> = {
  [Variant.Blue]: {
    [Theme.Dark]: {
      color: palette.blue.light2,
      bgColor: palette.blue.dark3,
      focusWithinBgColor: palette.blue.dark2,
    },
    [Theme.Light]: {
      color: palette.blue.dark3,
      bgColor: palette.blue.light3,
      focusWithinBgColor: palette.blue.light2,
    },
  },
  [Variant.Red]: {
    [Theme.Dark]: {
      color: palette.red.light2,
      bgColor: palette.red.dark3,
      focusWithinBgColor: palette.red.dark2,
    },
    [Theme.Light]: {
      color: palette.red.dark3,
      bgColor: palette.red.light3,
      focusWithinBgColor: palette.red.light2,
    },
  },
  [Variant.Gray]: {
    [Theme.Dark]: {
      color: palette.gray.light2,
      bgColor: palette.gray.dark2,
      focusWithinBgColor: palette.gray.dark1,
    },
    [Theme.Light]: {
      color: palette.black,
      bgColor: palette.gray.light2,
      focusWithinBgColor: palette.gray.light1,
    },
  },
  [Variant.Green]: {
    [Theme.Dark]: {
      color: palette.green.light2,
      bgColor: palette.green.dark3,
      focusWithinBgColor: palette.green.dark2,
    },
    [Theme.Light]: {
      color: palette.green.dark3,
      bgColor: palette.green.light3,
      focusWithinBgColor: palette.green.light2,
    },
  },
  [Variant.Purple]: {
    [Theme.Dark]: {
      color: palette.purple.light2,
      bgColor: palette.purple.dark3,
      focusWithinBgColor: palette.purple.dark2,
    },
    [Theme.Light]: {
      color: palette.purple.dark3,
      bgColor: palette.purple.light3,
      focusWithinBgColor: palette.purple.light2,
    },
  },
  [Variant.Yellow]: {
    [Theme.Dark]: {
      color: palette.yellow.light2,
      bgColor: palette.yellow.dark3,
      focusWithinBgColor: palette.yellow.dark2,
    },
    [Theme.Light]: {
      color: palette.yellow.dark3,
      bgColor: palette.yellow.light3,
      focusWithinBgColor: palette.yellow.light2,
    },
  },
};

export const chipWrapperThemeStyle = (variant: Variant, theme: Theme) => css`
  color: ${variantColor[variant][theme].color};
  background-color: ${variantColor[variant][theme].bgColor};
  transition: background-color ${transitionDuration.faster}ms ease-in-out;

  &:focus-within {
    background-color: ${variantColor[variant][theme].focusWithinBgColor};
  }
`;

export const chipWrapperBaseStyle = css`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const chipWrapperSizeStyle = (size: Size) => css`
  font-size: ${fontSize[size]}px;
  line-height: ${lineHeight[size]}px;
`;

export const disabledBaseChipWrapperStyles = css`
  cursor: not-allowed;
  // pointer-events: none; //TODO: are tooltips still allowed when disabled?
`;

export const disabledChipWrapperStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
    background-color: ${palette.gray.light3};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark4};
    box-shadow: inset 0 0 1px 1px ${palette.gray.dark2};
  `,
};

export const chipTextSizeStyle: Record<Size, string> = {
  [Size.Default]: css`
    padding-inline: 6px;
    padding-block: ${chipWrapperPaddingY[Size.Default]}px;
  `,
  [Size.Large]: css`
    padding-inline: 6px;
    padding-block: ${chipWrapperPaddingY[Size.Large]}px;
  `,
};

export const chipTextDismissSizeStyle: Record<Size, string> = {
  [Size.Default]: css`
    padding-inline-end: 2px;
  `,
  [Size.Large]: css`
    padding-inline-end: 2px;
  `,
};
