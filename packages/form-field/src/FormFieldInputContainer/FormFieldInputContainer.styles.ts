import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  Size,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';
import { FormFieldContextProps } from '../FormFieldContext';

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

export const getInputWrapperModeStyles = (theme: Theme) => {
  const isDarkMode = theme === Theme.Dark;
  /** token exceptions: background-color value was designated prior to token system */
  const backgroundColor = isDarkMode
    ? palette.gray.dark4
    : color.light.background.primary.default;

  return css`
    color: ${color[theme].text.primary.default};
    background: ${backgroundColor};
    border: 1px solid;

    & .${inputElementClassName} {
      &:-webkit-autofill {
        color: ${color[theme].text.primary.default};
        background: ${backgroundColor};
        border: 1px solid ${color[theme].border.primary.default};
        -webkit-text-fill-color: ${color[theme].text.primary.default};
        box-shadow: ${autofillShadowOverride(backgroundColor)};

        &:focus {
          box-shadow: ${autofillShadowOverride(backgroundColor)},
            ${focusRing[theme].input};
          border-color: ${color[theme].border.primary.focus};
        }

        &:hover:not(:focus) {
          box-shadow: ${autofillShadowOverride(backgroundColor)},
            ${hoverRing[theme].gray};
        }
      }

      &::placeholder {
        font-weight: ${fontWeights.regular};
        color: ${color[theme].text.placeholder.default};
      }
    }
  `;
};

const focusSelector = (styles: string) => css`
  @supports selector(:has(a, b)) {
    &:focus-within:not(:has(.${iconClassName}:focus)) {
      ${styles}
    }
  }

  /* Fallback for when "has" is unsupported */
  @supports not selector(:has(a, b)) {
    &:focus-within {
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
    padding-inline: ${spacing[200]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[100]}px;
    }
  `,
  [Size.Small]: css`
    height: 28px;
    padding-inline: ${spacing[200]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[100]}px;
    }
  `,
  [Size.Default]: css`
    height: 36px;
    padding-inline: ${spacing[300]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[150]}px;
    }
  `,
  [Size.Large]: css`
    height: 48px;
    padding-inline: ${spacing[300]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[200]}px;
    }
  `,
};

export const getInputWrapperStateStyles = ({
  theme,
  state,
}: {
  theme: Theme;
  state: FormFieldState;
}) => {
  const styleMap = {
    [FormFieldState.Error]: css`
      border-color: ${color[theme].border.error.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing[theme].red};
        }
      }
    `,
    [FormFieldState.None]: css`
      border-color: ${color[theme].border.primary.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing[theme].gray};
        }
      }
    `,
    [FormFieldState.Valid]: css`
      border-color: ${color[theme].border.success.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing[theme].green};
        }
      }
    `,
  };

  return styleMap[state];
};

export const getInputWrapperDisabledThemeStyles = (theme: Theme) => {
  return css`
    cursor: not-allowed;
    color: ${color[theme].text.disabled.default};
    background-color: ${color[theme].background.disabled.default};
    border-color: ${color[theme].border.disabled.default};

    &:hover,
    &:active {
      &:not(:focus) {
        box-shadow: inherit;
      }
    }

    & .${inputElementClassName} {
      cursor: not-allowed;
      pointer-events: none;
      color: ${color[theme].text.disabled.default};

      &::placeholder {
        color: inherit;
      }

      &:-webkit-autofill {
        &,
        &:hover,
        &:focus {
          appearance: none;

          border: 1px solid ${color[theme].border.disabled.hover};
          -webkit-text-fill-color: ${color[theme].text.disabled.hover};
          box-shadow: ${autofillShadowOverride(
            color[theme].background.disabled.hover,
          )};
        }

        &:hover:not(:focus) {
          box-shadow: inherit;
        }
      }
    }
  `;
};

export function getInputWrapperStyles({
  disabled,
  size: sizeProp,
  state,
  theme,
}: Required<
  Pick<FormFieldContextProps, 'disabled' | 'size' | 'state'> & { theme: Theme }
>) {
  return cx(
    inputWrapperBaseStyles,
    getInputWrapperModeStyles(theme),
    inputWrapperSizeStyles[sizeProp],
    {
      [cx(
        getInputWrapperStateStyles({ theme, state }),
        inputWrapperFocusStyles[theme],
      )]: !disabled,
      [getInputWrapperDisabledThemeStyles(theme)]: disabled,
    },
  );
}

export const childrenWrapperStyles = css`
  width: 100%;
`;

export const additionalChildrenWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getIconDisabledThemeStyles = (theme: Theme) => {
  return css`
    color: ${color[theme].icon.disabled.default};
  `;
};

export const getIconThemeStyles = (theme: Theme) => {
  return css`
    color: ${color[theme].icon.secondary.default};
  `;
};

export const getOptionalTextStyle = (theme: Theme) => {
  return css`
    color: ${color[theme].text.secondary.default};

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
};
