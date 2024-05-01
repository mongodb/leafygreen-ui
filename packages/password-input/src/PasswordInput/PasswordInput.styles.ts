import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
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
    color: ${color.light.text.primary.default};
    background: ${color.light.background.primary.default};

    &:focus-visible {
      box-shadow: ${focusRing.light.input};
      border-color: ${color.light.border.primary.focus};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${color.light.text.primary.default};
      box-shadow: ${autofillShadowOverride(
        color.light.background.primary.default,
      )};
      background: ${color.light.background.primary.default};

      &:focus-visible {
        box-shadow: ${autofillShadowOverride(
            color.light.background.primary.default,
          )},
          ${focusRing.light.input};
        border-color: ${color.light.border.primary.focus};
      }
    }

    &::placeholder {
      color: ${palette.gray.base};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    color: ${color.dark.text.primary.default};

    &:focus-visible {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${color.dark.text.primary.default};
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
  [Size.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 22px;
    padding-left: ${spacing[200]}px;
    padding-right: ${spacing[800]}px;
  `,
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 28px;
    padding-left: ${spacing[200]}px;
    padding-right: ${spacing[800]}px;
  `,
  [Size.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 36px;
    padding-left: ${spacing[300]}px;
    padding-right: ${spacing[1000]}px;
  `,
  [Size.Large]: css`
    font-size: ${typeScales.large.fontSize}px;
    line-height: ${typeScales.large.lineHeight}px;
    height: 48px;
    padding-left: ${spacing[300]}px;
    padding-right: ${spacing[1000]}px;
  `,
};

export const errorWarningDarkThemeStyles = css`
  &,
  &:-webkit-autofill {
    border-color: ${color.dark.border.error.default};
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
    border-color: ${color.light.border.error.default};
  }

  &:-webkit-autofill {
    &:hover:not(:focus-visible) {
      box-shadow: ${autofillShadowOverride(
          color.light.background.primary.default,
        )},
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
        border-color: ${color.light.border.success.default};
      }

      &:-webkit-autofill {
        &:hover:not(:focus-visible) {
          box-shadow: ${autofillShadowOverride(
              color.light.background.primary.default,
            )},
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
        border-color: ${color.light.border.primary.default};
      }

      &:-webkit-autofill {
        &:hover:not(:focus-visible) {
          box-shadow: ${autofillShadowOverride(
              color.light.background.primary.default,
            )},
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
        border-color: ${color.dark.border.success.default};
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
        border-color: ${color.dark.border.primary.default};
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

export const getInputDisabledStyles = (theme: Theme) => css`
  cursor: not-allowed;
  background-color: ${color[theme].background.disabled.default};
  border-color: ${color[theme].border.disabled.default};
  color: ${color[theme].text.disabled.default};

  &:-webkit-autofill {
    -webkit-text-fill-color: ${color[theme].text.disabled.default};
    border-color: ${color[theme].border.disabled.default};
    box-shadow: ${autofillShadowOverride(
      color[theme].background.disabled.default,
    )};

    &:focus-visible {
      -webkit-text-fill-color: ${color[theme].text.disabled.focus};
      box-shadow: ${autofillShadowOverride(
          color[theme].background.disabled.focus,
        )},
        ${focusRing[theme].input};
    }
  }
`;
