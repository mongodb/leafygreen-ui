import { css } from '@leafygreen-ui/emotion';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { Size } from './types';

export const svgWidth = 24;
export const menuItemPadding = 15;
export const paddingLeft = 52;
const indentation = 16;
const wedgeWidth = 4;
const minMenuContent = 32;
const menuBlockPadding: Record<Size, number> = {
  [Size.Default]: 2,
  [Size.Large]: 6.5,
};

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
  color: ${palette.white};
  cursor: pointer;
  border: none;
  background-color: ${palette.black};
  transition: background-color 150ms ease-in-out;

  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:before {
    content: '';
    position: absolute;
    width: ${wedgeWidth}px;
    left: 0px;
    height: calc(100% - 8px);
    max-height: 32px;
    border-radius: 0 ${wedgeWidth}px ${wedgeWidth}px 0;
    background-color: transparent;
    transition: background-color 150ms ease-in-out;
  }

  &:hover {
    text-decoration: none;
    background-color: ${palette.gray.dark3};
  }

  &:active {
    background-color: ${palette.black};
  }
`;

export const menuItemHeight = (size: Size) => {
  return css`
    min-height: ${minMenuContent + 2 * menuBlockPadding[size]}px;
  `;
};

export const textContainer = css`
  width: 100%;
  overflow: hidden;
  padding: 2px 0;
`;

export const mainIconStyle = css`
  color: ${palette.gray.dark1};
  margin-right: ${paddingLeft - svgWidth - menuItemPadding}px;
  flex-shrink: 0;
`;

export const titleTextStyle = css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: ${palette.white};

  // We create a pseudo element that's the width of the bolded text
  // This way there's no layout shift on hover when the text is bolded.
  &:after {
    content: attr(data-text);
    height: 0;
    font-weight: 700;
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;
  }
`;

export const descriptionTextStyle = css`
  font-size: 13px;
  font-weight: normal;
  line-height: 16px;
  color: ${palette.gray.light1};
`;

export const linkDescriptionTextStyle = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * Hover Styles
 */

export const getHoverStyles = (container: string) => ({
  text: css`
    ${container}:hover & {
      font-weight: 700;
    }
  `,
});

/**
 * Active styles
 */
export const activeMenuItemContainerStyle = css`
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
`;

export const activeTitleTextStyle = css`
  font-weight: bold;
  color: ${palette.green.base};
`;
export const activeDescriptionTextStyle = css`
  color: ${palette.gray.light1};
`;
export const activeIconStyle = css`
  color: ${palette.green.base};
`;

/**
 * Disabled styles
 */
export const disabledMenuItemContainerStyle = css`
  cursor: not-allowed;
  pointer-events: none;

  &:hover:before {
    background-color: unset;
  }
`;

export const disabledTextStyle = css`
  color: ${palette.gray.dark1};
  font-weight: 400;
`;

/**
 * Focused styles
 */
export const focusedMenuItemContainerStyle = css`
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
`;

export const getFocusedStyles = (selector: string) => {
  return {
    textStyle: css`
      ${selector}:focus & {
        color: ${palette.white};
      }
    `,
    descriptionStyle: css`
      ${selector}:focus & {
        color: ${palette.blue.light3};
      }
    `,
    iconStyle: css`
      ${selector}:focus > & {
        color: ${palette.blue.light3};
      }
    `,
  };
};

export const linkStyle = css`
  text-decoration: none;
  color: inherit;
`;
