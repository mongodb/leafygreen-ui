import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { variantColor as chipVariantColor } from '../Chip/Chip.styles';
import { Variant } from '../Chip/Chip.types';

export const variantColor: Record<
  Variant,
  Record<
    Theme,
    {
      color: string;
      focusBgColor: string;
      hoverBgColor: string;
      hoverFocusColor: string;
    }
  >
> = {
  [Variant.Blue]: {
    [Theme.Dark]: {
      color: palette.blue.light2,
      focusBgColor: chipVariantColor[Variant.Blue][Theme.Dark].focusBgColor,
      hoverBgColor: palette.blue.dark2,
      hoverFocusColor: palette.blue.light3,
    },
    [Theme.Light]: {
      color: palette.blue.dark3,
      focusBgColor: chipVariantColor[Variant.Blue][Theme.Light].focusBgColor,
      hoverBgColor: palette.blue.light2,
      hoverFocusColor: palette.blue.dark3,
    },
  },
  [Variant.Red]: {
    [Theme.Dark]: {
      color: palette.red.light2,
      focusBgColor: chipVariantColor[Variant.Red][Theme.Dark].focusBgColor,
      hoverBgColor: palette.red.dark2,
      hoverFocusColor: palette.red.light3,
    },
    [Theme.Light]: {
      color: palette.red.dark3,
      focusBgColor: chipVariantColor[Variant.Red][Theme.Light].focusBgColor,
      hoverBgColor: palette.red.light2,
      hoverFocusColor: palette.red.dark3,
    },
  },
  [Variant.Gray]: {
    [Theme.Dark]: {
      color: palette.gray.light1,
      focusBgColor: chipVariantColor[Variant.Gray][Theme.Dark].focusBgColor,
      hoverBgColor: palette.gray.dark1,
      hoverFocusColor: palette.gray.light3,
    },
    [Theme.Light]: {
      color: palette.gray.dark2,
      focusBgColor: chipVariantColor[Variant.Gray][Theme.Light].focusBgColor,
      hoverBgColor: palette.gray.light1,
      hoverFocusColor: palette.black,
    },
  },
  [Variant.Green]: {
    [Theme.Dark]: {
      color: palette.green.light2,
      focusBgColor: chipVariantColor[Variant.Green][Theme.Dark].focusBgColor,
      hoverBgColor: palette.green.dark2,
      hoverFocusColor: palette.green.light3,
    },
    [Theme.Light]: {
      color: palette.green.dark3,
      focusBgColor: chipVariantColor[Variant.Green][Theme.Light].focusBgColor,
      hoverBgColor: palette.green.light2,
      hoverFocusColor: palette.green.dark3,
    },
  },
  [Variant.Purple]: {
    [Theme.Dark]: {
      color: palette.purple.light2,
      focusBgColor: chipVariantColor[Variant.Purple][Theme.Dark].focusBgColor,
      hoverBgColor: palette.purple.dark2,
      hoverFocusColor: palette.purple.light3,
    },
    [Theme.Light]: {
      color: palette.purple.dark3,
      focusBgColor: chipVariantColor[Variant.Purple][Theme.Light].focusBgColor,
      hoverBgColor: palette.purple.light2,
      hoverFocusColor: palette.purple.dark3,
    },
  },
  [Variant.Yellow]: {
    [Theme.Dark]: {
      color: palette.yellow.light2,
      focusBgColor: chipVariantColor[Variant.Yellow][Theme.Dark].focusBgColor,
      hoverBgColor: palette.yellow.dark2,
      hoverFocusColor: palette.yellow.light3,
    },
    [Theme.Light]: {
      color: palette.yellow.dark3,
      focusBgColor: chipVariantColor[Variant.Yellow][Theme.Light].focusBgColor,
      hoverBgColor: palette.yellow.light2,
      hoverFocusColor: palette.yellow.dark3,
    },
  },
};

export const dismissButtonBaseStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color ${transitionDuration.faster}ms ease-in-out;
  padding: 0 2px;
  align-self: stretch;
`;

export const dismissButtonThemeStyle = (variant: Variant, theme: Theme) => css`
  color: ${variantColor[variant][theme].color};

  &:not(:disabled):hover {
    background-color: ${variantColor[variant][theme].hoverBgColor};
    color: ${variantColor[variant][theme].hoverFocusColor};
  }

  &:focus-visible {
    color: ${variantColor[variant][theme].hoverFocusColor};
    background-color: ${variantColor[variant][theme].focusBgColor};

    &:not(:disabled):hover {
      background-color: ${variantColor[variant][theme].hoverBgColor};
    }
  }
`;

export const dismissButtonBaseDisabledStyles = css`
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const dismissButtonDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:disabled {
      color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    &:disabled {
      color: ${palette.gray.dark2};
    }
  `,
};
