import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { Size, State } from './PasswordInput.types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const labelBaseStyles = css`
  display: block;
  margin-bottom: ${spacing[1]}px;
`;

export const labelLargeOverrideStyles = css`
  font-size: ${typeScales.large.fontSize}px;
`;

export const inheritTypeScale = css`
  font-size: inherit;
  line-height: inherit;
`;

export const inputWrapperStyles = css`
  position: relative;
`;

export const inputBaseStyles = css`
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
`;

export const inputBaseThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background: ${palette.white};

    &:focus-visible {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${palette.black};
      box-shadow: ${autofillShadowOverride(palette.white)};
      background: ${palette.white};

      &:focus-visible {
        box-shadow: ${autofillShadowOverride(palette.white)},
          ${focusRing.light.input};
        border-color: ${palette.white};
      }
    }

    &::placeholder {
      color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    color: ${palette.gray.light2};

    &:focus-visible {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${palette.gray.light2};
      box-shadow: ${autofillShadowOverride(palette.gray.dark4)};
      background-color: ${palette.gray.dark4};

      &:focus-visible {
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
          ${focusRing.dark.input};
        border-color: ${palette.gray.dark4};
      }
    }

    &::placeholder {
      color: ${palette.gray.dark1};
    }
  `,
};

export const inputSizeStyles: Record<Size, string> = {
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 28px;
    padding: 0 ${spacing[5]}px 0 10px;
  `,
  [Size.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 36px;
    padding: 0 ${spacing[2] * 5}px 0 12px;
  `,
  [Size.Large]: css`
    font-size: 18px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 48px;
    padding: 0 ${spacing[2] * 5}px 0 ${spacing[3]}px;
  `,
};

export const errorWarningDarkThemeStyles = css`
  &,
  &:-webkit-autofill {
    border-color: ${palette.red.base};
  }

  &:-webkit-autofill {
    &:hover:not(:focus-visible) {
      box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
        ${hoverRing.dark.red};
    }
  }

  &:hover,
  &:active {
    &:not(:focus-visible) {
      box-shadow: ${hoverRing.dark.red};
    }
  }
`;
export const errorWarningLightThemeStyles = css`
  &,
  &:-webkit-autofill {
    border-color: ${palette.red.base};
  }

  &:-webkit-autofill {
    &:hover:not(:focus-visible) {
      box-shadow: ${autofillShadowOverride(palette.white)},
        ${hoverRing.light.red};
    }
  }

  &:hover,
  &:active {
    &:not(:focus-visible) {
      box-shadow: ${hoverRing.light.red};
    }
  }
`;

export const inputThemeStyles: Record<Theme, Record<State, string>> = {
  [Theme.Light]: {
    [State.Error]: css`
      ${errorWarningLightThemeStyles};
    `,
    [State.Warning]: css`
      ${errorWarningLightThemeStyles};
    `,
    [State.Valid]: css`
      &,
      &:-webkit-autofill {
        border-color: ${palette.green.dark1};
      }

      &:-webkit-autofill {
        &:hover:not(:focus-visible) {
          box-shadow: ${autofillShadowOverride(palette.white)},
            ${hoverRing.light.green};
        }
      }

      &:hover,
      &:active {
        &:not(:focus-visible) {
          box-shadow: ${hoverRing.light.green};
        }
      }
    `,
    [State.None]: css`
      &,
      &:-webkit-autofill {
        border-color: ${palette.gray.base};
      }

      &:-webkit-autofill {
        &:hover:not(:focus-visible) {
          box-shadow: ${autofillShadowOverride(palette.white)},
            ${hoverRing.light.gray};
        }
      }

      &:hover,
      &:active {
        &:not(:focus-visible) {
          box-shadow: ${hoverRing.light.gray};
        }
      }
    `,
  },
  [Theme.Dark]: {
    [State.Error]: css`
      ${errorWarningDarkThemeStyles};
    `,
    [State.Warning]: css`
      ${errorWarningDarkThemeStyles};
    `,
    [State.Valid]: css`
      &,
      &:-webkit-autofill {
        border-color: ${palette.green.dark1};
      }

      &:-webkit-autofill {
        &:hover:not(:focus-visible) {
          box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
            ${hoverRing.dark.green};
        }
      }

      &:hover,
      &:active {
        &:not(:focus-visible) {
          box-shadow: ${hoverRing.dark.green};
        }
      }
    `,
    [State.None]: css`
      &,
      &:-webkit-autofill {
        border-color: ${palette.gray.base};
      }

      &:-webkit-autofill {
        &:hover:not(:focus-visible) {
          box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
            ${hoverRing.dark.gray};
        }
      }

      &:hover,
      &:active {
        &:not(:focus-visible) {
          box-shadow: ${hoverRing.dark.gray};
        }
      }
    `,
  },
};

export const inputIconSizeStyles: Record<Size, string> = {
  [Size.Small]: css`
    padding-right: ${spacing[1] * 13}px;
  `,
  [Size.Default]: css`
    padding-right: ${spacing[1] * 14}px;
  `,
  [Size.Large]: css`
    padding-right: ${spacing[1] * 16}px;
  `,
};

export const inputDisabledBaseStyles = css`
  cursor: not-allowed;
`;

export const inputDisabledThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light2};
    border-color: ${palette.gray.light1};
    color: ${palette.gray.base};

    &:-webkit-autofill {
      -webkit-text-fill-color: ${palette.gray.base};
      border-color: ${palette.gray.light1};
      box-shadow: ${autofillShadowOverride(palette.gray.light2)};

      &:focus-visible {
        -webkit-text-fill-color: ${palette.gray.base};
        box-shadow: ${autofillShadowOverride(palette.gray.light2)},
          ${focusRing.light.input};
      }
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark3};
    border-color: ${palette.gray.dark2};
    color: ${palette.gray.dark1};

    &:-webkit-autofill {
      -webkit-text-fill-color: ${palette.gray.dark1};
      border-color: ${palette.gray.dark2};
      box-shadow: ${autofillShadowOverride(palette.gray.dark3)};

      &:focus-visible {
        -webkit-text-fill-color: ${palette.gray.dark1};
        box-shadow: ${autofillShadowOverride(palette.gray.dark3)},
          ${focusRing.dark.input};
      }
    }
  `,
};
