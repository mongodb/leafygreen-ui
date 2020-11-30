import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { mq } from '../breakpoints';

const menuItemHeight = 36;

export const menuContainerStyle = css`
  position: relative;
  width: 280px;

  & > ul {
    padding-top: 20px;
  }
`;

export const menuItemContainerStyle = css`
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
`;

export const ulStyle = css`
  max-height: ${5 * menuItemHeight}px;
  list-style: none;
  padding: unset;
  overflow-y: auto;
`;

export const nameStyle = css`
  font-size: 14px;
  color: ${uiColors.gray.dark3};
  word-break: break-word;
  padding-right: 5px;
`;

export const baseButtonStyle = css`
  padding: unset;
  display: flex;
  align-items: center;
  color: ${uiColors.gray.dark2};
  cursor: pointer;
  background-color: white;
  position: relative;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${uiColors.gray.light2};
  padding: 3px 5px;

  ${mq({
    width: ['180px', '90px', '90px'],
    height: ['30px', '36px', '36px'],
  })}

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

export const selectedStyle = css`
  margin-left: 4px;
  font-weight: bolder;
  flex-grow: 1;
  text-align: left;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const activeButtonStyle = css`
  transition: background-color 150ms ease-in-out;
  background-color: ${uiColors.gray.light2};
`;

export const iconColorStyle = css`
  color: ${uiColors.gray.base};
`;

export const caretBaseStyle = css`
  flex-shrink: 0;
`;
