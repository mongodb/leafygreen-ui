import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  hoverRing,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { Size, State } from '../NumberInput/NumberInput.types';

export const baseInputStyles = css`
  all: unset;
  font-family: ${fontFamilies.default};
  font-weight: normal;
  width: 100%;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  height: inherit;
  box-sizing: border-box;

  // border-top-right-radius: 0;
  // border-bottom-right-radius: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const sizeInputStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    padding: 0 ${spacing[1] * 3}px;
  `,
  [Size.Small]: css`
    padding: 0 ${spacing[1] * 3}px;
  `,
  [Size.Default]: css`
    padding: 0 ${spacing[1] * 3}px;
  `,
};

export const wrapperBaseStyles = css`
  position: relative;
  border: 1px solid;
  border-radius: 6px;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
  overflow: hidden;
  display: flex;
  align-items: center;

  &:focus-within,
  &:hover,
  &:active {
    z-index: 1;
  }
`;

export const arrowsBaseStyles = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 5px;
  height: 100%;
  justify-content: center;
`;

export const arrowBaseStyles = css`
  all: unset;
  display: flex;
  position: relative;
  height: 12px;
  width: 8px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    svg {
      color: red;
    }
  }

  svg {
    position: absolute;
    translate: -50% -50%;
    top: 50%;
    left: 50%;
  }
`;

export const selectBaseStyles = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const wrapperThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background: ${palette.white};

    &:focus-within {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }

    // &:-webkit-autofill {
    //   -webkit-text-fill-color: ${palette.black};
    //   box-shadow: ${autofillShadowOverride(palette.white)};
    //   background: ${palette.white};

    //   &:focus-visible {
    //     box-shadow: ${autofillShadowOverride(palette.white)},
    //       ${focusRing.light.input};
    //     border-color: ${palette.white};
    //   }
    // }

    // &::placeholder {
    //   color: ${palette.gray.light1};
    // }

    // &,
    // &:-webkit-autofill {
    //   border-color: ${palette.gray.base};
    // }

    // &:-webkit-autofill {
    //   &:hover:not(:focus-visible) {
    //     box-shadow: ${autofillShadowOverride(palette.white)},
    //       ${hoverRing.light.gray};
    //   }
    // }

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing.light.gray};
      }
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    color: ${palette.gray.light2};

    &:focus-within {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }

    // &:-webkit-autofill {
    //   -webkit-text-fill-color: ${palette.gray.light2};
    //   box-shadow: ${autofillShadowOverride(palette.gray.dark4)};
    //   background-color: ${palette.gray.dark4};

    //   &:focus-visible {
    //     box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
    //       ${focusRing.dark.input};
    //     border-color: ${palette.gray.dark4};
    //   }
    // }

    // &::placeholder {
    //   color: ${palette.gray.dark1};
    // }

    // &,
    // &:-webkit-autofill {
    //   border-color: ${palette.gray.base};
    // }

    // &:-webkit-autofill {
    //   &:hover:not(:focus-visible) {
    //     box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
    //       ${hoverRing.dark.gray};
    //   }
    // }

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }
  `,
};

export const errorWarningDarkThemeStyles = css`
  // &,
  // &:-webkit-autofill {
  //   border-color: ${palette.red.base};
  // }

  // &:-webkit-autofill {
  //   &:hover:not(:focus-visible) {
  //     box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
  //       ${hoverRing.dark.red};
  //   }
  // }

  border-color: ${palette.red.base};

  &:hover,
  &:active {
    &:not(:focus-within) {
      box-shadow: ${hoverRing.dark.red};
    }
  }
`;

export const errorWarningLightThemeStyles = css`
  // &,
  // &:-webkit-autofill {
  //   border-color: ${palette.red.base};
  // }

  // &:-webkit-autofill {
  //   &:hover:not(:focus-visible) {
  //     box-shadow: ${autofillShadowOverride(palette.white)},
  //       ${hoverRing.light.red};
  //   }
  // }

  border-color: ${palette.red.base};

  &:hover,
  &:active {
    &:not(:focus-within) {
      box-shadow: ${hoverRing.light.red};
    }
  }
`;

export const wrapperStateStyles: Record<Theme, Record<State, string>> = {
  [Theme.Light]: {
    [State.Error]: css`
      ${errorWarningLightThemeStyles};
    `,
    [State.None]: css`
      // &,
      // &:-webkit-autofill {
      //   border-color: ${palette.gray.base};
      // }

      // &:-webkit-autofill {
      //   &:hover:not(:focus-visible) {
      //     box-shadow: ${autofillShadowOverride(palette.white)},
      //       ${hoverRing.light.gray};
      //   }
      // }

      border-color: ${palette.gray.base};

      &:hover,
      &:active {
        &:not(:focus-within) {
          box-shadow: ${hoverRing.light.gray};
        }
      }
    `,
  },
  [Theme.Dark]: {
    [State.Error]: css`
      ${errorWarningDarkThemeStyles};
    `,
    [State.None]: css`
      // &,
      // &:-webkit-autofill {
      //   border-color: ${palette.gray.base};
      // }

      // &:-webkit-autofill {
      //   &:hover:not(:focus-visible) {
      //     box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
      //       ${hoverRing.dark.gray};
      //   }
      // }

      border-color: ${palette.gray.base};

      &:hover,
      &:active {
        &:not(:focus-within) {
          box-shadow: ${hoverRing.dark.gray};
        }
      }
    `,
  },
};
