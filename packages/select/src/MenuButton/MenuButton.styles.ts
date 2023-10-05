import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontWeights,
  hoverRing,
  Size,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

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
      padding: 0 12px;
    }
  `,
  [Size.Large]: css`
    > *:last-child {
      padding: 0 12px 0 ${spacing[3]}px;
    }
  `,
  [Size.Small]: css`
    > *:last-child {
      padding: 0 ${spacing[2]}px 0 10px;
    }
  `,
  [Size.XSmall]: css`
    text-transform: none;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    > *:last-child {
      padding: 0 ${spacing[1]}px 0 10px;
    }
  `,
};

export const menuButtonModeOverrides: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    // Override button default color
    > *:last-child {
      > svg {
        color: ${palette.gray.dark2};
      }
    }
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.base};
    background-color: ${palette.gray.dark4};
    color: ${palette.gray.light3};

    // Override button default color
    > *:last-child {
      > svg {
        color: ${palette.gray.light1};
      }
    }

    &:hover,
    &:active,
    &:focus {
      background-color: ${palette.gray.dark4};
      color: ${palette.gray.light3};
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
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};

    &:hover,
    &:active,
    &:focus {
      color: ${palette.gray.light1};
    }
  `,
};

export const menuButtonDisabledStyles = css`
  cursor: not-allowed;
  pointer-events: unset;
  box-shadow: unset;

  &:active {
    pointer-events: none;
  }
`;

export const menuButtonDisabledThemeStyles: Record<Theme, string> = {
  [Theme.Light]: cx(
    menuButtonDisabledStyles,
    css`
      &[aria-disabled='true'] {
        background-color: ${palette.gray.light2};
        color: ${palette.gray.base};

        > *:last-child {
          > svg {
            color: ${palette.gray.base};
          }
        }
      }
    `,
  ),
  [Theme.Dark]: cx(
    menuButtonDisabledStyles,
    css`
      &[aria-disabled='true'] {
        background-color: ${palette.gray.dark3};
        color: ${palette.gray.dark1};
        border-color: ${palette.gray.dark2};

        > *:last-child {
          > svg {
            color: ${palette.gray.dark1};
          }
        }
      }
    `,
  ),
};

export const menuButtonTextWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  gap: ${spacing[1]}px;
  overflow: hidden;
`;

export const menuButtonTextStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const errorColor: Record<Theme, string> = {
  [Theme.Light]: palette.red.base,
  [Theme.Dark]: palette.red.light1,
};

export const menuButtonErrorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${errorColor[Theme.Light]};
    background-color: ${palette.white};

    &:hover,
    &:active {
      box-shadow: ${hoverRing.light.red};
    }
  `,
  [Theme.Dark]: css`
    border-color: ${errorColor[Theme.Dark]};

    &:hover,
    &:active {
      border-color: ${errorColor[Theme.Dark]};
      box-shadow: ${hoverRing.dark.red};
    }
  `,
};
