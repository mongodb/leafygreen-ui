import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import {
  color,
  focusRing,
  hoverRing,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { Size, TimeInputState } from '../TimeInput/TimeInput.types';

export const wrapperClassName = createUniqueClassName('number-input-wrapper');

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

  min-width: 100px;
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
  [TimeInputState.Error]: css`
    border-color: ${color[theme].border.error.default};
  `,
  [TimeInputState.None]: css`
    border-color: ${color[theme].border.primary.default};
  `,
});

export const getWrapperHoverStyles = (theme: Theme) => ({
  [TimeInputState.Error]: css`
    border-color: ${color[theme].border.error.default};

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing[theme].red};
      }
    }
  `,
  [TimeInputState.None]: css`
    border-color: ${color[theme].border.primary.default};

    &:hover,
    &:active {
      &:not(:focus-within) {
        box-shadow: ${hoverRing[theme].gray};
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

export const getBaseStyles = ({
  theme,
  disabled,
  state,
  className,
  hasSelectOptions,
}: {
  theme: Theme;
  disabled: boolean;
  state: TimeInputState;
  className?: string;
  hasSelectOptions: boolean;
}) =>
  cx(
    wrapperClassName,
    wrapperBaseStyles,
    wrapperThemeStyles[theme],
    getWrapperStateStyles(theme)[state],
    {
      [getWrapperHoverStyles(theme)[state]]: !disabled,
      [getWrapperDisabledStyles(theme)]: disabled,
      [selectBaseStyles]: hasSelectOptions,
    },
    className,
  );
