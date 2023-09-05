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
      hoverFocusColor: string;
      hoverFocusBgColor: string;
      hoverAndFocusBgColor: string;
    }
  >
> = {
  [Variant.Blue]: {
    [Theme.Dark]: {
      color: palette.blue.light2,
      hoverFocusColor: palette.blue.light3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Blue][Theme.Dark].focusWithinBgColor,
      hoverAndFocusBgColor: palette.blue.dark1,
    },
    [Theme.Light]: {
      color: palette.blue.dark3,
      hoverFocusColor: palette.blue.dark3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Blue][Theme.Light].focusWithinBgColor,
      hoverAndFocusBgColor: '#89D2FF',
    },
  },
  [Variant.Red]: {
    [Theme.Dark]: {
      color: palette.red.light2,
      hoverFocusColor: palette.red.light3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Red][Theme.Dark].focusWithinBgColor,
      hoverAndFocusBgColor: '#BB1A1A',
    },
    [Theme.Light]: {
      color: palette.red.dark3,
      hoverFocusColor: palette.red.dark3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Red][Theme.Light].focusWithinBgColor,
      hoverAndFocusBgColor: '#FF9789',
    },
  },
  [Variant.Gray]: {
    [Theme.Dark]: {
      color: palette.gray.light1,
      hoverFocusColor: palette.gray.light3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Gray][Theme.Dark].focusWithinBgColor,
      hoverAndFocusBgColor: palette.gray.base,
    },
    [Theme.Light]: {
      color: palette.gray.dark2,
      hoverFocusColor: palette.black,
      hoverFocusBgColor:
        chipVariantColor[Variant.Gray][Theme.Light].focusWithinBgColor,
      hoverAndFocusBgColor: '#A0A9A8',
    },
  },
  [Variant.Green]: {
    [Theme.Dark]: {
      color: palette.green.light2,
      hoverFocusColor: palette.green.light3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Green][Theme.Dark].focusWithinBgColor,
      hoverAndFocusBgColor: palette.green.dark1,
    },
    [Theme.Light]: {
      color: palette.green.dark3,
      hoverFocusColor: palette.green.dark3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Green][Theme.Light].focusWithinBgColor,
      hoverAndFocusBgColor: palette.green.light1,
    },
  },
  [Variant.Purple]: {
    [Theme.Dark]: {
      color: palette.purple.light2,
      hoverFocusColor: palette.purple.light3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Purple][Theme.Dark].focusWithinBgColor,
      hoverAndFocusBgColor: '#892CCA',
    },
    [Theme.Light]: {
      color: palette.purple.dark3,
      hoverFocusColor: palette.purple.dark3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Purple][Theme.Light].focusWithinBgColor,
      hoverAndFocusBgColor: '#E19AFF',
    },
  },
  [Variant.Yellow]: {
    [Theme.Dark]: {
      color: palette.yellow.light2,
      hoverFocusColor: palette.yellow.light3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Yellow][Theme.Dark].focusWithinBgColor,
      hoverAndFocusBgColor: '#C27823',
    },
    [Theme.Light]: {
      color: palette.yellow.dark3,
      hoverFocusColor: palette.yellow.dark3,
      hoverFocusBgColor:
        chipVariantColor[Variant.Yellow][Theme.Light].focusWithinBgColor,
      hoverAndFocusBgColor: '#FFD664',
    },
  },
};

export const chipButtonStyle = css`
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

export const chipButtonThemeStyle = (variant: Variant, theme: Theme) => css`
  color: ${variantColor[variant][theme].color};

  &:not(:disabled):hover,
  &:focus-visible {
    color: ${variantColor[variant][theme].hoverFocusColor};
    background-color: ${variantColor[variant][theme].hoverFocusBgColor};
  }

  &:focus-visible &,
  &:focus-visible {
    &:not(:disabled):hover {
      background-color: ${variantColor[variant][theme].hoverAndFocusBgColor};
    }
  }
`;

export const chipButtonBaseDisabledStyles = css`
  &:disabled {
    cursor: not-allowed;
  }
`;

export const chipButtonDisabledStyle: Record<Theme, string> = {
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
