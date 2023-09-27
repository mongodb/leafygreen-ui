import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  Size,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { InputState } from './DateFormField.types';

export const iconButtonClassName = createUniqueClassName('calendar-button');
export const baseWrapperStyles = css``;

export const wrapperFontStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};

export const textContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing[1]}px;
`;

const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const inputBaseStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[1]}px;
  font-size: inherit;
  line-height: inherit;
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
  z-index: 0;
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

      &:not([aria-disabled='true']):focus {
        box-shadow: ${autofillShadowOverride(palette.white)},
          ${focusRing.light.input};
        border-color: ${palette.white};
      }

      &:not([aria-disabled='true']):hover:not(:focus) {
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
      &:not([aria-disabled='true']):not(:focus) {
        box-shadow: ${hoverRing.light.gray};
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

      &:not([aria-disabled='true']):focus {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${focusRing.dark.input};
        border-color: ${palette.blue.light1};
      }

      &:not([aria-disabled='true']):hover:not(:focus) {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${hoverRing.dark.gray};
      }
    }

    &:hover,
    &:active {
      &:not([aria-disabled='true']):not(:focus) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }

    &::placeholder {
      color: ${palette.gray.dark1};
      font-weight: ${fontWeights.regular};
    }
  `,
};

const focusSelector = (styles: string) => css`
  @supports selector(:has(a, b)) {
    &:not([aria-disabled='true']):focus-within:not(
        :has(.${iconButtonClassName}:focus)
      ) {
      ${styles}
    }
  }

  /* Fallback for when "has" is unsupported */
  @supports not selector(:has(a, b)) {
    &:not([aria-disabled='true']):focus-within {
      ${styles}
    }
  }
`;

export const inputFocusStyles: Record<Theme, string> = {
  [Theme.Light]: focusSelector(`
     {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `),
  [Theme.Dark]: focusSelector(`
     {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `),
};

export const inputSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    padding-inline: 10px 2px;
  `,
  [Size.Small]: css`
    height: 28px;
    padding-inline: 10px 2px;
  `,
  [Size.Default]: css`
    height: 36px;
    padding-inline: 12px 4px;
  `,
  [Size.Large]: css`
    height: 48px;
    padding-inline: 16px 8px;
  `,
};

export const inputStateStyles: Record<InputState, Record<Theme, string>> = {
  [InputState.Error]: {
    [Theme.Light]: css`
      &:not([aria-disabled='true']) {
        border-color: ${palette.red.base};

        &:hover,
        &:active {
          &:not([aria-disabled='true']):not(:focus) {
            box-shadow: ${hoverRing.light.red};
          }
        }
      }
    `,
    [Theme.Dark]: css`
      &:not([aria-disabled='true']) {
        border-color: ${palette.red.light1};

        &:hover,
        &:active {
          &:not([aria-disabled='true']):not(:focus) {
            box-shadow: ${hoverRing.dark.red};
          }
        }
      }
    `,
  },
  [InputState.Unset]: {
    [Theme.Light]: css``,
    [Theme.Dark]: css``,
  },
};

export const inputDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    background-color: ${palette.gray.light2};
    border-color: ${palette.gray.light1};

    & input {
      cursor: not-allowed;
      pointer-events: none;
      color: ${palette.gray.base};

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
    cursor: not-allowed;
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark3};
    border-color: ${palette.gray.dark2};

    & input {
      cursor: not-allowed;
      pointer-events: none;
      color: ${palette.gray.dark2};

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

export const childrenWrapperStyles = css`
  width: 100%;
`;

export const errorIconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};
