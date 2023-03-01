import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  hoverRing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { State } from './InputBase.types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const inheritTypeScale = css`
  font-size: inherit;
  line-height: inherit;
`;

export const baseStyle = css`
  ${inheritTypeScale};
  font-family: ${fontFamilies.default};
  width: 100%;
  height: 36px;
  font-weight: normal;
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

export const themeStyles: Record<Theme, string> = {
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
