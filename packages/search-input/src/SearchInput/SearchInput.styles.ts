import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { Size } from './SearchInput.types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const formStyle = css`
  outline: none;
`;

export const inputWrapperStyle = css`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  border: 1px solid;
  border-radius: 6px;
  z-index: 0;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
`;

export const inputWrapperSizeStyle: Record<Size, string> = {
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 28px;
    grid-template-columns: 28px 1fr;
    grid-auto-columns: 28px;
  `,
  [Size.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 36px;
    grid-template-columns: 36px 1fr;
    grid-auto-columns: 36px;
  `,
  [Size.Large]: css`
    font-size: 18px;
    line-height: 32px;
    height: 48px;
    grid-template-columns: 48px 1fr;
    grid-auto-columns: 48px;
  `,
};

export const inputWrapperThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background: ${palette.white};
    border-color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    background-color: ${palette.gray.dark4};
    border-color: ${palette.gray.base};
  `,
};

export const inputWrapperInteractiveStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover,
    &:active {
      &:not(:disabled):not(:focus-within) {
        box-shadow: ${hoverRing.light.gray};
      }
    }
  `,
  [Theme.Dark]: css`
    &:hover,
    &:active {
      &:not(:disabled):not(:focus-within) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }
  `,
};

export const inputWrapperFocusStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:not(:disabled):focus-within {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `,
  [Theme.Dark]: css`
    &:not(:disabled):focus-within {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `,
};

export const inputWrapperDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.base};
    background-color: ${palette.gray.light2};
    border-color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark3};
    border-color: ${palette.gray.dark2};
  `,
};

export const baseInputStyle = css`
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  background-color: inherit;
  font-family: ${fontFamilies.default};
  width: 100%;
  height: 1.5em;
  font-weight: ${fontWeights.regular};
  z-index: 1;
  outline: none;
  border: none;
  padding: 0;

  &[aria-disabled='true'] {
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
    &:-webkit-autofill {
      color: inherit;
      background: transparent;
      border: none;
      -webkit-text-fill-color: inherit;

      &[aria-disabled='false'] {
        box-shadow: ${autofillShadowOverride(palette.white)};

        &:focus {
          box-shadow: ${autofillShadowOverride(palette.white)},
            ${focusRing.light.input};
        }

        &:hover:not(:focus) {
          box-shadow: ${autofillShadowOverride(palette.white)},
            ${hoverRing.light.gray};
        }
      }
    }

    &::placeholder {
      color: ${palette.gray.base};
      font-weight: ${fontWeights.regular};
    }

    &[aria-disabled='true'] {
      &::placeholder {
        color: ${palette.gray.base};
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
    &:-webkit-autofill {
      color: inherit;
      background: transparent;
      border: none;
      -webkit-text-fill-color: ${palette.gray.light3};
      &[aria-disabled='false'] {
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
    }

    &::placeholder {
      color: ${palette.gray.base};
      font-weight: ${fontWeights.regular};
    }

    &[aria-disabled='true'] {
      &::placeholder {
        color: ${palette.gray.dark1};
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

export const searchIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

export const searchIconSizeStyle: Record<Size, string> = {
  [Size.Small]: css`
    left: 10px;
  `,
  [Size.Default]: css`
    left: 12px;
  `,
  [Size.Large]: css`
    left: 16px;
  `,
};

export const searchIconDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const clearButtonStyle = css``;
export const clearButtonSizeStyle: Record<Size, string> = {
  [Size.Small]: css`
    height: 26px;
    width: 26px;
  `,
  [Size.Default]: css`
    height: 28px;
    width: 28px;
  `,
  [Size.Large]: css`
    height: 28px;
    width: 28px;
  `,
};
