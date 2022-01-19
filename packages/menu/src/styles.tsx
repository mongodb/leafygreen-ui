import { css } from '@leafygreen-ui/emotion';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';

const indentation = 15;
const leftBar = 5;
export const svgWidth = 24;
export const menuItemPadding = 15;
export const paddingLeft = 52;

// TODO: Refresh - Note - no dark mode
export const menuItemContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${indentation}px;
  padding-right: ${indentation}px;
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: background-color 150ms ease-in-out;
  border: none;
  margin: unset;
  width: 100%;
  font-family: ${fontFamilies.default};
  font-size: 13px;
  box-sizing: border-box;
  background-color: ${palette.black};
  text-align: left;
  color: ${palette.white};

  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:before {
    content: '';
    position: absolute;
    width: ${leftBar}px;
    top: 0;
    bottom: 0;
    left: -1px;
    background-color: transparent;
    transition: background-color 150ms ease-in-out;
  }

  &:hover {
    text-decoration: none;
    background-color: ${palette.gray.dark3};
    &:before {
      /* background-color: ${palette.gray.light1}; */
    }
  }

  &:active {
    background-color: ${palette.black};
    &:before {
      background-color: ${palette.green.base};
    }
  }
`;

export const activeMenuItemContainerStyle = css`
  background-color: ${palette.black};

  &:before {
    background-color: ${palette.green.base};
  }

  &:hover {
    /* background-color: ${palette.gray.dark3}; */
    color: ${palette.green.base};
    &:before {
      background-color: ${palette.green.base};
    }
  }
`;

export const disabledMenuItemContainerStyle = css`
  cursor: not-allowed;
  pointer-events: none;

  &:hover:before {
    background-color: unset;
  }
`;

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

export const linkStyle = css`
  text-decoration: none;
  color: inherit;
`;

export const disabledTextStyle = css`
  color: ${palette.gray.dark2};
`;
