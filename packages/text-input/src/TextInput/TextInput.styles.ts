import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { SizeVariant, State } from './TextInput.types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const iconClassName = createUniqueClassName('icon-selector');

export const wrapperStyle = css`
  font-family: ${fontFamilies.default};
  display: flex;
  flex-direction: column;
`;

export const getWrapperFontSize = (
  size: SizeVariant,
  baseFontSize: BaseFontSize,
): string => {
  switch (size) {
    case SizeVariant.XSmall: {
      return css`
        font-size: ${typeScales.body1.fontSize}px;
        line-height: ${typeScales.body1.lineHeight}px;
      `;
    }

    case SizeVariant.Small: {
      return css`
        font-size: ${typeScales.body1.fontSize}px;
        line-height: ${typeScales.body1.lineHeight}px;
      `;
    }

    case SizeVariant.Large: {
      return css`
        font-size: ${typeScales.large.fontSize}px;
        line-height: ${typeScales.large.lineHeight}px;
      `;
    }

    case SizeVariant.Default:
    default: {
      const baseFontSizeObject =
        baseFontSize == BaseFontSize.Body1
          ? typeScales.body1
          : typeScales.body2;
      return css`
        font-size: ${baseFontSizeObject.fontSize}px;
        line-height: ${baseFontSizeObject.lineHeight}px;
      `;
    }
  }
};

export const inheritTypeScale = css`
  font-size: inherit;
  line-height: inherit;
`;

export const textContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing[1]}px;
`;

export const inputContainerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
`;

export const baseInputStyle = css`
  ${inheritTypeScale};
  font-family: ${fontFamilies.default};
  width: 100%;
  height: 36px;
  font-weight: ${fontWeights.regular};
  border: 1px solid;
  z-index: 1;
  outline: none;
  border-radius: 6px;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;

  &:disabled {
    cursor: not-allowed;

    &:hover,
    &:active {
      box-shadow: none;
    }
  }

  &::placeholder {
    ${inheritTypeScale};
  }

  /* clears the ‘X’ from Internet Explorer & Chrome */
  &[type='search'] {
    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }
`;

export const inputModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background: ${palette.white};
    border: 1px solid ${palette.gray.base};

    &:-webkit-autofill {
      color: ${palette.black};
      background: ${palette.white};
      border: 1px solid ${palette.gray.base};
      -webkit-text-fill-color: ${palette.black};
      box-shadow: ${autofillShadowOverride(palette.white)};

      &:not(:disabled):focus {
        box-shadow: ${autofillShadowOverride(palette.white)},
          ${focusRing.light.input};
        border-color: ${palette.white};
      }

      &:not(:disabled):hover:not(:focus) {
        box-shadow: ${autofillShadowOverride(palette.white)},
          ${hoverRing.light.gray};
      }
    }

    &::placeholder {
      color: ${palette.gray.light1};
      font-weight: ${fontWeights.regular};
    }

    &:hover,
    &:active {
      &:not(:disabled):not(:focus) {
        box-shadow: ${hoverRing.light.gray};
      }
    }

    &:disabled {
      color: ${palette.gray.base};
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light1};

      &::placeholder {
        color: inherit;
      }

      &:-webkit-autofill {
        &,
        &:hover,
        &:focus {
          appearance: none;
          border: 1px solid ${palette.gray.base};
          -webkit-text-fill-color: ${palette.gray.base};
          box-shadow: ${autofillShadowOverride(palette.gray.light2)};
        }
      }
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light3};
    background-color: ${palette.gray.dark4};
    border: 1px solid ${palette.gray.base};

    &:-webkit-autofill {
      border: 1px solid ${palette.gray.base};
      color: ${palette.gray.light3};
      background: ${palette.gray.dark4};
      -webkit-text-fill-color: ${palette.gray.light3};
      box-shadow: ${autofillShadowOverride(palette.gray.dark4)};

      &:not(:disabled):focus {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${focusRing.dark.input};
        border-color: ${palette.blue.light1};
      }

      &:not(:disabled):hover:not(:focus) {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${hoverRing.dark.gray};
      }
    }

    &:hover,
    &:active {
      &:not(:disabled):not(:focus) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }

    &::placeholder {
      color: ${palette.gray.dark1};
      font-weight: ${fontWeights.regular};
    }

    &:disabled {
      color: ${palette.gray.dark1};
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.dark2};

      &::placeholder {
        color: inherit;
      }

      &:-webkit-autofill {
        &,
        &:hover,
        &:focus {
          appearance: none;
          border: 1px solid ${palette.gray.dark1};
          -webkit-text-fill-color: ${palette.gray.dark1};
          box-shadow: ${autofillShadowOverride(palette.gray.dark2)};
        }
      }
    }
  `,
};

export const inputFocusStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:not(:disabled):focus {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `,
  [Theme.Dark]: css`
    &:not(:disabled):focus {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `,
};

export const inputSizeStyles: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    height: 22px;
    padding-left: 10px;
  `,
  [SizeVariant.Small]: css`
    height: 28px;
    padding-left: 10px;
  `,
  [SizeVariant.Default]: css`
    height: 36px;
    padding-left: 12px;
  `,
  [SizeVariant.Large]: css`
    height: 48px;
    padding-left: 16px;
  `,
};

// Below numbers are "magic" because they need to account for border, font's letter widths, etc
export const inputPaddingForIndicator: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    padding-right: 31px;
  `,
  [SizeVariant.Small]: css`
    padding-right: 34px;
  `,
  [SizeVariant.Default]: css`
    padding-right: 37px;
  `,
  [SizeVariant.Large]: css`
    padding-right: 39px;
  `,
};

// Below numbers are "magic" because they need to account for border, font's letter widths, etc
export const inputPaddingForOptionalText: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    padding-right: 64px;
  `,
  [SizeVariant.Small]: css`
    padding-right: 69px;
  `,
  [SizeVariant.Default]: css`
    padding-right: 71px;
  `,
  [SizeVariant.Large]: css`
    padding-right: 74px;
  `,
};

export const inputStateStyles: Record<State, Record<Theme, string>> = {
  [State.Valid]: {
    [Theme.Light]: css`
      &:not(:disabled) {
        border-color: ${palette.green.dark1};

        &:hover,
        &:active {
          &:not(:disabled):not(:focus) {
            box-shadow: ${hoverRing.light.green};
          }
        }
      }
    `,
    [Theme.Dark]: css`
      &:not(:disabled) {
        border-color: ${palette.green.dark1};

        &:hover,
        &:active {
          &:not(:disabled):not(:focus) {
            box-shadow: ${hoverRing.dark.green};
          }
        }
      }
    `,
  },
  [State.Error]: {
    [Theme.Light]: css`
      &:not(:disabled) {
        border-color: ${palette.red.base};

        &:hover,
        &:active {
          &:not(:disabled):not(:focus) {
            box-shadow: ${hoverRing.light.red};
          }
        }
      }
    `,
    [Theme.Dark]: css`
      &:not(:disabled) {
        border-color: ${palette.red.light1};

        &:hover,
        &:active {
          &:not(:disabled):not(:focus) {
            box-shadow: ${hoverRing.dark.red};
          }
        }
      }
    `,
  },
  [State.None]: {
    [Theme.Light]: css``,
    [Theme.Dark]: css``,
  },
};

/**
 * Input indicator
 */

export const inputIndicatorStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
  padding-left: ${spacing[2]}px;
  right: 2px; // account for border width
`;

// Below numbers are "magic" because they need to account for border width, etc that would need larger refactoring to make DRY
export const inputIndicatorSizeStyle: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    padding-right: 6px;
  `,
  [SizeVariant.Small]: css`
    padding-right: 10px;
  `,
  [SizeVariant.Default]: css`
    padding-right: 12px;
  `,
  [SizeVariant.Large]: css`
    padding-right: 14px;
  `,
};

export const stateIndicatorStyles: Record<
  'valid' | 'error',
  Record<Theme, string>
> = {
  [State.Valid]: {
    [Theme.Light]: css`
      color: ${palette.green.dark1};
    `,
    [Theme.Dark]: css`
      color: ${palette.green.base};
    `,
  },
  [State.Error]: {
    [Theme.Light]: css`
      color: ${palette.red.base};
    `,
    [Theme.Dark]: css`
      color: ${palette.red.light1};
    `,
  },
};

export const optionalTextBaseStyle = css`
  font-size: 12px;
  line-height: 12px;
  font-style: italic;
  font-weight: ${fontWeights.regular};
  display: flex;
  align-items: center;
  > p {
    margin: 0;
  }
`;

export const optionalTextThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

export const errorMessageStyle = css`
  ${inheritTypeScale};
  min-height: 20px;
  padding-top: 4px;
  font-weight: ${fontWeights.regular};
`;
