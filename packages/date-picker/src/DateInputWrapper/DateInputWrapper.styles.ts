import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
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

import { InputState } from './DateInputWrapper.types';

export const baseStyles = css``;

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

export const inputSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    padding-inline: 10px;
  `,
  [Size.Small]: css`
    height: 28px;
    padding-inline: 10px;
  `,
  [Size.Default]: css`
    height: 36px;
    padding-inline: 12px;
  `,
  [Size.Large]: css`
    height: 48px;
    padding-inline: 16px;
  `,
};

export const inputStateStyles: Record<InputState, Record<Theme, string>> = {
  [InputState.Error]: {
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
  [InputState.Unset]: {
    [Theme.Light]: css``,
    [Theme.Dark]: css``,
  },
};

export const errorIconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};

export const iconStyles = css`
  color: ${palette.gray.base};
`;
