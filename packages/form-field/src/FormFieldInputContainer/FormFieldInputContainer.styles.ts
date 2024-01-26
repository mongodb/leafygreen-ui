import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  Size,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';

export const inputElementClassName = createUniqueClassName('form-field-input');
export const iconClassName = createUniqueClassName('form-field-icon');
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const inputWrapperBaseStyles = css`
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

  & .${inputElementClassName} {
    font-family: ${fontFamilies.default};
    color: inherit;
    background-color: inherit;
    font-size: inherit;
    line-height: inherit;
    outline: none;
    border: none;
  }

  & .${iconClassName} svg,
  & svg {
    min-height: 16px;
    min-width: 16px;
  }
`;

export const inputWrapperModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background: ${palette.white};
    border: 1px solid ${palette.gray.base};

    &:hover,
    &:active {
      &:not([aria-disabled='true']):not(:focus) {
        box-shadow: ${hoverRing.light.gray};
      }
    }

    & .${inputElementClassName} {
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
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light3};
    background-color: ${palette.gray.dark4};
    border: 1px solid ${palette.gray.base};

    &:hover,
    &:active {
      &:not([aria-disabled='true']):not(:focus) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }

    & .${inputElementClassName} {
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

      &::placeholder {
        color: ${palette.gray.dark1};
        font-weight: ${fontWeights.regular};
      }
    }
  `,
};

const focusSelector = (styles: string) => css`
  @supports selector(:has(a, b)) {
    &:not([aria-disabled='true']):focus-within:not(
        :has(.${iconClassName}:focus)
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

export const inputWrapperFocusStyles: Record<Theme, string> = {
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

/** Selector that is true if the icon element passed in is a button */
const iconIsButtonSelector = `&:has(button.${iconClassName})`;

export const inputWrapperSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    padding-inline: 6px;

    ${iconIsButtonSelector} {
      padding-inline-end: 4px;
    }
  `,
  [Size.Small]: css`
    height: 28px;
    padding-inline: 6px;

    ${iconIsButtonSelector} {
      padding-inline-end: 4px;
    }
  `,
  [Size.Default]: css`
    height: 36px;
    padding-inline: 12px;

    ${iconIsButtonSelector} {
      padding-inline-end: 6px;
    }
  `,
  [Size.Large]: css`
    height: 48px;
    padding-inline: 16px;

    ${iconIsButtonSelector} {
      padding-inline-end: 10px;
    }
  `,
};

export const inputWrapperStateStyles: Record<
  FormFieldState,
  Record<Theme, string>
> = {
  [FormFieldState.Error]: {
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
  [FormFieldState.None]: {
    [Theme.Light]: css``,
    [Theme.Dark]: css``,
  },
  [FormFieldState.Valid]: {
    [Theme.Light]: css`
      &:not([aria-disabled='true']) {
        border-color: ${palette.green.dark1};

        &:hover,
        &:active {
          &:not([aria-disabled='true']):not(:focus) {
            box-shadow: ${hoverRing.light.green};
          }
        }
      }
    `,
    [Theme.Dark]: css`
      &:not([aria-disabled='true']) {
        border-color: ${palette.green.dark1};

        &:hover,
        &:active {
          &:not([aria-disabled='true']):not(:focus) {
            box-shadow: ${hoverRing.dark.green};
          }
        }
      }
    `,
  },
};

export const inputWrapperDisabledStyles: Record<Theme, string> = {
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

export const iconsWrapperStyles = (size: Size) => css`
  display: flex;
  align-items: center;
  gap: ${size === Size.XSmall ? spacing[1] : spacing[2]}px;
`;

export const iconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};

    &[aria-disabled='true'],
    &:disabled {
      color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};

    &[aria-disabled='true'],
    &:disabled {
      color: ${palette.gray.dark2};
    }
  `,
};

export const validIconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.base};
  `,
};

export const errorIconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
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
