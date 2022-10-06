import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  focusRing,
  fontFamilies,
  hoverRing,
  typeScales,
} from '@leafygreen-ui/tokens';
import { SizeVariant } from './types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

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
        font-size: 18px;
        line-height: 32px;
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

export const inputContainerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 0;
`;

export const baseInputStyle = css`
  font-size: inherit;
  line-height: inherit;
  font-family: ${fontFamilies.default};
  width: 100%;
  height: 36px;
  font-weight: normal;
  border: 1px solid;
  z-index: 1;
  outline: none;
  border-radius: 6px;
  transition: 150ms ease-in-out;
  transition-property: border-color, box-shadow;

  &:disabled {
    cursor: not-allowed;

    &:hover,
    &:active {
      box-shadow: none;
    }
  }

  &::placeholder {
    font-size: inherit;
    line-height: inherit;
  }
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
`;

export const inputThemeStyle: Record<Theme, string> = {
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

      &:focus {
        box-shadow: ${autofillShadowOverride(palette.white)},
          ${focusRing.light.input};
        border-color: ${palette.white};
      }

      &:hover:not(:focus) {
        box-shadow: ${autofillShadowOverride(palette.white)},
          ${hoverRing.light.gray};
      }
    }

    &::placeholder {
      color: ${palette.gray.light1};
      font-weight: normal;
    }

    &:hover,
    &:active {
      &:not(:focus) {
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

      &:focus {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${focusRing.dark.input};
        border-color: ${palette.blue.light1};
      }

      &:hover:not(:focus) {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${hoverRing.dark.gray};
      }
    }

    &:hover,
    &:active {
      &:not(:focus) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }

    &::placeholder {
      color: ${palette.gray.base};
      font-weight: normal;
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
    &:focus {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `,
};

export const inputSizeStyles: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    height: 22px;
    padding-left: 16px;
  `,
  [SizeVariant.Small]: css`
    height: 28px;
    padding-left: 24px;
  `,
  [SizeVariant.Default]: css`
    height: 36px;
    padding-left: 32px;
  `,
  [SizeVariant.Large]: css`
    height: 48px;
    padding-left: 40px;
  `,
};

export const searchIconStyle = css`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  z-index: 2;
`;

export const searchIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

export const searchIconSizeStyle: Record<SizeVariant, string> = {
  [SizeVariant.XSmall]: css`
    width: 8px;
    left: 4px;
  `,
  [SizeVariant.Small]: css`
    width: 12px;
    left: 6px;
  `,
  [SizeVariant.Default]: css`
    width: 16px;
    left: 8px;
  `,
  [SizeVariant.Large]: css`
    width: 20px;
    left: 10px;
  `,
};
