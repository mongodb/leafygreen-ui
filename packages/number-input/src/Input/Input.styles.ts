import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
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

import { Size, State } from '../NumberInput/NumberInput.types';

/**
 * Adds an inset box shadow to hide the UA background styles for autofilled inputs
 */
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const wrapperClassName = createUniqueClassName('number-input-wrapper');

export const inputBaseStyles = css`
  all: unset;
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  width: 100%;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  height: inherit;
  box-sizing: border-box;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: background-color;
  padding: 0 0 0 12px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;

    &:hover,
    &:active {
      box-shadow: none;
    }
  }

  .${wrapperClassName}:hover &,
  .${wrapperClassName}:focus-within & {
    transition-property: padding;
  }
`;

export const inputErrorPaddingTransitionStyles = css`
  transition-property: padding;
`;

export const inputAnimateStyles = css`
  .${wrapperClassName}:hover &,
  .${wrapperClassName}:focus-within & {
    padding-right: ${spacing[1] * 6}px;
  }
`;

export const inputThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &::placeholder {
      color: ${palette.gray.light1};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${palette.black};
      border: 0;
      box-shadow: ${autofillShadowOverride(palette.white)};

      &:focus-visible,
      &:hover {
        -webkit-text-fill-color: ${palette.black};
        box-shadow: ${autofillShadowOverride(palette.white)};
      }
    }
  `,
  [Theme.Dark]: css`
    &::placeholder {
      color: ${palette.gray.dark1};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${palette.gray.light2};
      border: 0;
      box-shadow: ${autofillShadowOverride(palette.gray.dark4)};

      &:focus-visible,
      &:hover {
        -webkit-text-fill-color: ${palette.gray.light2};
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)};
      }
    }
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
  flex-grow: 1;
  flex-shrink: 0;
  z-index: 1;
`;

export const selectBaseStyles = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const wrapperThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background: ${palette.white};

    &:focus-within {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    color: ${palette.gray.light2};

    &:focus-within {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `,
};

export const wrapperStateStyles: Record<Theme, Record<State, string>> = {
  [Theme.Light]: {
    [State.Error]: css`
      border-color: ${palette.red.base};
    `,
    [State.None]: css`
      border-color: ${palette.gray.base};
    `,
  },
  [Theme.Dark]: {
    [State.Error]: css`
      border-color: ${palette.red.base};
    `,
    [State.None]: css`
      border-color: ${palette.gray.base};
    `,
  },
};

export const wrapperHoverStyles: Record<Theme, Record<State, string>> = {
  [Theme.Light]: {
    [State.Error]: css`
      border-color: ${palette.red.base};

      &:hover,
      &:active {
        &:not(:focus-within) {
          box-shadow: ${hoverRing.light.red};
        }
      }
    `,
    [State.None]: css`
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
      border-color: ${palette.red.base};

      &:hover,
      &:active {
        &:not(:focus-within) {
          box-shadow: ${hoverRing.dark.red};
        }
      }
    `,
    [State.None]: css`
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

export const wrapperDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light2};
    border-color: ${palette.gray.light1};
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    border-color: ${palette.gray.dark3};
    color: ${palette.gray.dark1};
  `,
};

export const inputErrorAnimateStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    padding-right: ${spacing[1] * 7}px;

    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      padding-right: ${spacing[1] * 11}px;
    }
  `,
  [Size.Small]: css`
    padding-right: ${spacing[1] * 7}px;

    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      padding-right: ${spacing[1] * 11}px;
    }
  `,
  [Size.Default]: css`
    padding-right: ${spacing[1] * 8}px;

    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      padding-right: ${spacing[1] * 11}px;
    }
  `,
};

export const inputSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
  `,
  [Size.Small]: css`
    height: 28px;
  `,
  [Size.Default]: css`
    height: 36px;
  `,
};
