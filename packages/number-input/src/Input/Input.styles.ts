import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  .${wrapperClassName}:hover &,
  .${wrapperClassName}:focus-within & {
    transition-property: padding;
  }
`;

export const inputThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &::placeholder {
      color: ${palette.gray.base};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${color.light.text.primary.default};
      border: 0;
      box-shadow: ${autofillShadowOverride(
        color.light.background.primary.default,
      )};

      &:focus-visible,
      &:hover {
        -webkit-text-fill-color: ${color.light.text.primary.hover};
        box-shadow: ${autofillShadowOverride(
          color.light.background.primary.default,
        )};
      }
    }
  `,
  [Theme.Dark]: css`
    &::placeholder {
      color: ${palette.gray.dark1};
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: ${color.dark.text.primary.default};
      border: 0;
      box-shadow: ${autofillShadowOverride(palette.gray.dark4)};

      &:focus-visible,
      &:hover {
        -webkit-text-fill-color: ${color.dark.text.primary.hover};
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
    background-color: ${color.light.background.primary.default};
    color: ${color.light.text.primary.default};

    &:focus-within {
      box-shadow: ${focusRing.light.input};
      border-color: ${color.light.border.primary.focus};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    color: ${color.dark.text.primary.default};

    &:focus-within {
      box-shadow: ${focusRing.dark.input};
      border-color: ${color.dark.border.primary.focus};
    }
  `,
};

export const getWrapperStateStyles = (theme: Theme) => ({
  [State.Error]: css`
    border-color: ${color[theme].border.error.default};
  `,
  [State.None]: css`
    border-color: ${color[theme].border.primary.default};
  `,
  [State.Valid]: css`
    border-color: ${color[theme].border.success.default};
  `,
});

export const getWrapperHoverStyles = (theme: Theme) => ({
  [State.Error]: css`
    border-color: ${color[theme].border.error.default};

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing[theme].red};
      }
    }
  `,
  [State.None]: css`
    border-color: ${color[theme].border.primary.default};

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing[theme].gray};
      }
    }
  `,
  [State.Valid]: css`
    border-color: ${color[theme].border.success.default};

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing[theme].green};
      }
    }
  `,
});

export const getWrapperDisabledStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.disabled.default};
  border-color: ${color[theme].border.disabled.default};
  color: ${color[theme].text.disabled.default};
`;

export const inputSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    padding-left: ${spacing[200]}px;
    padding-right: ${spacing[600]}px;
  `,
  [Size.Small]: css`
    height: 28px;
    padding-left: ${spacing[200]}px;
    padding-right: ${spacing[600]}px;
  `,
  [Size.Default]: css`
    height: 36px;
    padding-left: ${spacing[300]}px;
    padding-right: ${spacing[800]}px;
  `,
  [Size.Large]: css`
    height: 48px;
    padding-left: ${spacing[300]}px;
    padding-right: ${spacing[800]}px;
  `,
};
