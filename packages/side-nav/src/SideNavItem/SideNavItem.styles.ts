import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';

// container styles
export const defaultStyle = css`
  // Unset defaults
  margin: 0;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;

  // Layout
  width: 100%;
  min-height: 32px;
  padding: ${spacing[1]}px ${spacing[3]}px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  // Typography
  font-family: ${fontFamilies.default};
  font-weight: normal;
  text-align: left;
  text-decoration: none;
  text-transform: capitalize;
  color: ${palette.gray.dark2};

  // Stateful transitions
  transition: background-color 150ms ease-in-out;
  background-color: ${transparentize(100, palette.gray.light3)};

  &:hover {
    background-color: ${palette.gray.light2};
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

export const activeStyle = css`
  cursor: default;
  font-weight: bold;
  text-decoration: none;

  &,
  &:hover {
    color: ${palette.green.dark3};
    background-color: ${palette.green.light3};
  }
`;

export const disabledStyle = css`
  pointer-events: none;
  background-color: transparent;
  font-weight: normal;

  &,
  &:hover {
    color: ${palette.gray.light1};
    background-color: ${transparentize(100, palette.gray.light3)};
  }
`;

export const focusedStyle = css`
  position: relative;

  &:before {
    transition: all 150ms ease-in-out;
    content: '';
    transform: scaleY(0.3);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    height: 20px;
    margin: auto;
    background-color: ${palette.blue.light1};
    opacity: 0;
    border-radius: 0 3px 3px 0;
  }

  &:focus {
    text-decoration: none;
    color: ${palette.blue.dark3};
    background-color: ${palette.blue.light2};

    &:before {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

export const focusedDisabledStyle = css`
  &:focus {
    color: ${palette.blue.light1};
  }
`;

export const glyphWrapper = css`
  margin-right: ${spacing[2]}px;
  display: inline-flex;
  align-items: center;
`;

export const nestedChildrenStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
