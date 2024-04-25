import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  focusRing,
  fontWeights,
  hoverRing,
  Size,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

import { State } from '../Select/Select.types';

export const menuButtonTextClassName = createUniqueClassName('select-menu');

export const menuButtonStyleOverrides = css`
  // Override button defaults
  font-weight: ${fontWeights.regular};
  > *:last-child {
    grid-template-columns: 1fr 16px;
    justify-content: flex-start;

    > svg {
      justify-self: right;
      width: 16px;
      height: 16px;
    }
  }
`;

export const menuButtonSizeStyle: Record<Size, string> = {
  [Size.Default]: css`
    > *:last-child {
      padding: 0 ${spacing[200]}px 0 ${spacing[300]}px;
    }
  `,
  [Size.Large]: css`
    > *:last-child {
      padding: 0 ${spacing[200]}px 0 ${spacing[300]}px;
    }
  `,
  [Size.Small]: css`
    > *:last-child {
      padding: 0 ${spacing[100]}px 0 ${spacing[200]}px;
    }
  `,
  [Size.XSmall]: css`
    text-transform: none;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    > *:last-child {
      padding: 0 ${spacing[100]}px 0 ${spacing[200]}px;
    }
  `,
};

export const menuButtonModeOverrides: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${color.light.background.primary.default};
    // Override button default color
    > *:last-child {
      > svg {
        color: ${color.light.icon.primary.default};
      }
    }
  `,
  [Theme.Dark]: css`
    border-color: ${color.dark.border.primary.default};
    background-color: ${palette.gray.dark4};
    color: ${color.dark.text.primary.default};

    // Override button default color
    > *:last-child {
      > svg {
        color: ${color.dark.icon.primary.default};
      }
    }

    &:hover,
    &:active,
    &:focus {
      background-color: ${palette.gray.dark4};
      color: ${color.dark.text.primary.hover};
    }
  `,
};

// Override default button focus styles
export const menuButtonFocusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-visible {
      box-shadow: ${focusRing['light'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
  [Theme.Dark]: css`
    &:focus-visible {
      background-color: ${palette.gray.dark4};
      box-shadow: ${focusRing['dark'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
};

export const menuButtonDeselectedStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};

    &:hover,
    &:active,
    &:focus {
      color: ${palette.gray.light1};
    }
  `,
};

export const getMenuButtonDisabledThemeStyles = (theme: Theme) => css`
  cursor: not-allowed;
  pointer-events: unset;
  box-shadow: unset;

  &:active {
    pointer-events: none;
  }

  &[aria-disabled='true'] {
    background-color: ${color[theme].background.disabled.default};
    border-color: ${color[theme].border.disabled.default};
    color: ${color[theme].text.disabled.default};

    &:hover,
    &:active {
      box-shadow: inherit;
    }

    > *:last-child {
      > svg {
        color: ${color[theme].icon.disabled.default};
      }
    }
  }
`;

export const menuButtonTextWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: ${spacing[100]}px;
  overflow: hidden;
`;

export const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const getMenuButtonStateStyles = (theme: Theme) => ({
  [State.Error]: css`
    border-color: ${color[theme].border.error.default};

    &:hover,
    &:active {
      border-color: ${color[theme].border.error.hover};
      box-shadow: ${hoverRing[theme].red};
    }
  `,
  [State.None]: css``,
  [State.Valid]: css`
    border-color: ${color[theme].border.success.default};

    &:hover,
    &:active {
      border-color: ${color[theme].border.success.hover};
      box-shadow: ${hoverRing[theme].green};
    }
  `,
});
