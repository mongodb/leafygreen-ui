import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const indentation = 15;
const leftBar = 5;
export const svgWidth = 24;
export const menuItemPadding = 15;
export const paddingLeft = 52;

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
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  background: ${uiColors.white};
  text-align: left;

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
    background-color: ${uiColors.gray.light2};
    &:before {
      background-color: ${uiColors.gray.light1};
    }
  }

  &:active {
    background-color: ${uiColors.gray.light2};
    &:before {
      background-color: ${uiColors.gray.light1};
    }
  }
`;

export const activeMenuItemContainerStyle = css`
  &:before {
    background-color: ${uiColors.green.base};
  }

  &:hover {
    background-color: ${uiColors.gray.light3};
    color: ${uiColors.green.dark3};
    &:before {
      background-color: ${uiColors.green.base};
    }
  }
`;

export const disabledMenuItemContainerStyle = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: ${uiColors.gray.light3};

  &:hover:before {
    background-color: unset;
  }
`;

export const focusedMenuItemContainerStyle = css`
  &:focus {
    text-decoration: none;
    background-color: ${uiColors.blue.light3};
    color: ${uiColors.blue.dark3};

    &:before {
      background-color: #63b0d0;
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
  color: ${uiColors.gray.light1};
`;
