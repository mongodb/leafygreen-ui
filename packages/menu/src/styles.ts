import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  fontWeights,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Size } from './types';

export const svgWidth = 24;
export const paddingLeftWithGlyph = 54;
export const paddingLeftWithoutGlyph = 20;
const indentation = 20;
const wedgeWidth = 4;

/**
 * Base styles
 */
export const menuItemContainerStyle = css`
  display: flex;
  position: relative;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: unset;
  padding-left: ${indentation}px;
  padding-right: ${indentation}px;
  font-family: ${fontFamilies.default};
  font-size: 13px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  border: none;

  transition: background-color ${transitionDuration.default}ms ease-in-out;

  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:before {
    content: '';
    position: absolute;
    width: ${wedgeWidth}px;
    left: 0px;
    border-radius: 0 ${wedgeWidth}px ${wedgeWidth}px 0;
    background-color: transparent;
    transition: background-color ${transitionDuration.default}ms ease-in-out;
  }

  &:hover {
    text-decoration: none;
  }
`;

export const menuItemContainerThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.white};
    background-color: ${palette.black};

    &:hover,
    &:active {
      background-color: ${palette.gray.dark3};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
    background-color: ${palette.gray.light2};

    &:hover,
    &:active {
      background-color: ${palette.gray.light1};
    }
  `,
};

export const menuItemHeight = (size: Size) => {
  return css`
    min-height: ${size === Size.Default ? 36 : 45}px;

    &:before {
      height: ${size === Size.Default ? 22 : 36}px;
    }
  `;
};

export const textContainer = css`
  width: 100%;
  overflow: hidden;
  padding: 2px 0;
`;

export const mainIconBaseStyle = css`
  margin-right: 16px;
  flex-shrink: 0;
`;

export const mainIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const titleTextStyle = css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  font-size: 13px;
  font-weight: ${fontWeights.medium};

  // We create a pseudo element that's the width of the bolded text
  // This way there's no layout shift on hover when the text is bolded.
  &:after {
    content: attr(data-text);
    height: 0;
    font-weight: ${fontWeights.bold};
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;
  }
`;

const descriptionTextStyle = css`
  font-size: 13px;
  font-weight: ${fontWeights.regular};
  line-height: 16px;
  color: ${palette.gray.light1};
`;

export const descriptionTextThemeStyle: Record<Theme, string> = {
  [Theme.Light]: cx(
    descriptionTextStyle,
    css`
      color: ${palette.gray.light1};
    `,
  ),
  [Theme.Dark]: cx(
    descriptionTextStyle,
    css`
      color: ${palette.gray.dark2};
    `,
  ),
};

export const linkDescriptionTextStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * Hover Styles
 */

export const getHoverStyles = (containerClass: string, theme: Theme) => ({
  text: css`
    .${containerClass} {
      &:not(:disabled):hover & {
        font-weight: ${fontWeights.bold};
      }
    }
  `,
  activeText: css`
    .${containerClass} {
      &:not(:disabled):hover & {
        color: ${theme === Theme.Light
          ? palette.green.base
          : palette.green.dark3};
      }
    }
  `,
});

/**
 * Active styles
 */
export const activeMenuItemContainerStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};

    &:before {
      background-color: ${palette.green.base};
    }

    &:hover {
      color: ${palette.green.base};

      &:before {
        background-color: ${palette.green.base};
      }
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.light2};

    &:before {
      background-color: ${palette.green.dark2};
    }

    &:hover {
      color: ${palette.green.dark3};

      &:before {
        background-color: ${palette.green.dark2};
      }
    }
  `,
};

export const activeTitleTextStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    font-weight: ${fontWeights.bold};
    color: ${palette.green.base};
  `,
  [Theme.Dark]: css`
    font-weight: ${fontWeights.bold};
    color: ${palette.green.dark2};
  `,
};

export const activeDescriptionTextStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
};

export const activeIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.dark2};
  `,
};

/**
 * Disabled styles
 */

const disabledMenuItemContainerStyle = css`
  cursor: not-allowed;

  &:active {
    pointer-events: none;
    background-color: unset;
  }

  &:hover {
    &,
    &:before {
      background-color: unset;
    }
  }
`;

export const disabledMenuItemContainerThemeStyle: Record<Theme, string> = {
  [Theme.Dark]: cx(
    disabledMenuItemContainerStyle,
    css`
      background-color: ${palette.gray.light2};
    `,
  ),
  [Theme.Light]: cx(
    disabledMenuItemContainerStyle,
    css`
      background-color: ${palette.black};
    `,
  ),
};

export const disabledTextStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
    font-weight: ${fontWeights.regular};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
    font-weight: ${fontWeights.regular};
  `,
};

/**
 * Focused styles
 */
export const focusedMenuItemContainerStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      text-decoration: none;
      background-color: ${palette.blue.dark3};
      color: ${palette.white};

      &:before {
        background-color: ${palette.blue.light1};
      }
    }

    &::-moz-focus-inner {
      border: 0;
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      text-decoration: none;
      background-color: ${palette.blue.light2};
      color: ${palette.blue.dark2};

      &:before {
        background-color: ${palette.blue.base};
      }
    }

    &::-moz-focus-inner {
      border: 0;
    }
  `,
};

export const getFocusedStyles = (containerClassName: string, theme: Theme) => {
  return {
    textStyle: css`
      .${containerClassName}:focus & {
        color: ${theme === Theme.Light
          ? palette.blue.light3
          : palette.blue.dark1};
      }
    `,
    descriptionStyle: css`
      .${containerClassName}:focus & {
        color: ${theme === Theme.Light
          ? palette.blue.light3
          : palette.blue.dark1};
      }
    `,
    iconStyle: css`
      .${containerClassName}:focus & {
        color: ${theme === Theme.Light
          ? palette.blue.light3
          : palette.blue.dark1};
      }
    `,
  };
};

export const linkStyle = css`
  text-decoration: none;
`;

export const focusedSubMenuItemBorderStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      &::after {
        background-color: ${palette.blue.dark3};
      }
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      &::after {
        background-color: ${palette.blue.light2};
      }
    }
  `,
};
