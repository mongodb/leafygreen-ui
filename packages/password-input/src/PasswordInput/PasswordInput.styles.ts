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

import { SizeVariant, States } from './PasswordInput.types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const labelBaseStyles = css`
  display: block;
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

export const inputFocusThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:not(:disabled) {
      color: ${palette.black};
      background: ${palette.white};
    }

    &:not(:disabled):focus-visible {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `,
  [Theme.Dark]: css`
    &:not(:disabled) {
      background-color: ${palette.gray.dark4};
      color: ${palette.gray.light2};
    }

    &:not(:disabled):focus-visible {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `,
};

export const inputSizeStyles: Record<SizeVariant, string> = {
  [SizeVariant.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 28px;
    padding: 0 ${spacing[5]}px 0 10px; //TODO: spacing tokens
  `,
  [SizeVariant.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 36px;
    padding: 0 ${spacing[2] * 5}px 0 ${spacing[3]}px; //TODO: spacing tokens
  `,
  [SizeVariant.Large]: css`
    font-size: 18px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: 48px;
    padding: 0 ${spacing[2] * 5}px 0 ${spacing[3]}px; //TODO: spacing tokens
  `,
};

export const errorWarningDarkThemeStyles = css`
  &:not(:disabled) {
    border-color: ${palette.red.base};

    &:hover,
    &:active {
      &:not(:disabled):not(:focus) {
        box-shadow: ${hoverRing.dark.red};
      }
    }
  }
`;
export const errorWarningLightThemeStyles = css`
  &:not(:disabled) {
    border-color: ${palette.red.base};

    &:hover,
    &:active {
      &:not(:disabled):not(:focus) {
        box-shadow: ${hoverRing.light.red};
      }
    }
  }
`;

export const inputThemeStyles: Record<Theme, Record<States, string>> = {
  [Theme.Light]: {
    [States.Error]: css`
      ${errorWarningLightThemeStyles};
    `,
    [States.Warning]: css`
      ${errorWarningLightThemeStyles};
    `,
    [States.Valid]: css`
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
    [States.None]: css`
      &:not(:disabled) {
        border-color: ${palette.gray.base};

        &:hover,
        &:active {
          &:not(:disabled):not(:focus) {
            box-shadow: ${hoverRing.light.gray};
          }
        }
      }
    `,
  },
  [Theme.Dark]: {
    [States.Error]: css`
      ${errorWarningDarkThemeStyles};
    `,
    [States.Warning]: css`
      ${errorWarningDarkThemeStyles};
    `,
    [States.Valid]: css`
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
    [States.None]: css`
      &:not(:disabled) {
        border-color: ${palette.gray.base};

        &:hover,
        &:active {
          &:not(:disabled):not(:focus) {
            box-shadow: ${hoverRing.dark.gray};
          }
        }
      }
    `,
  },
};

export const messageWrapperStyles = css`
  padding: 0;
  margin: ${spacing[1]}px 0 0;
  list-style-type: none;
`;
