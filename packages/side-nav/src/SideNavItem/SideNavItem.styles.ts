import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';

export const sideNavItemClassName = createUniqueClassName('side-nav-item');

// container styles
export const baseNavItemStyle = css`
  // Unset defaults
  margin: 0;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;

  // Layout
  position: relative;
  width: 100%;
  min-height: 32px;
  padding: 6px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  // Typography
  font-family: ${fontFamilies.default};
  font-weight: normal;
  text-align: left;
  text-decoration: none;
  text-transform: capitalize;
  color: ${palette.black};

  // Stateful transitions
  transition: background-color ${transitionDuration.faster}ms ease-in-out;
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

  // Setup the active/focus wedge
  &:before {
    content: '';
    position: absolute;
    background-color: transparent;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: ${spacing[1]}px;
    border-radius: 0 6px 6px 0;
    transition: transform ${transitionDuration.default}ms ease-in-out;
    transform: scaleY(0.3);
  }
`;

export const activeNavItemStyle = css`
  cursor: default;
  font-weight: bold;
  text-decoration: none;
  color: ${palette.green.dark2};

  &,
  &:hover {
    background-color: ${palette.green.light3};
  }

  // The active wedge
  &:before {
    transform: scaleY(1);
    background-color: ${palette.green.dark1};
  }
`;

export const disabledNavItemStyle = css`
  background-color: transparent;
  font-weight: normal;
  cursor: not-allowed;

  &,
  &:hover {
    color: ${palette.gray.base};
    background-color: ${transparentize(100, palette.gray.light3)};
  }
`;

export const focusedNavItemStyle = css`
  position: relative;

  &:focus {
    text-decoration: none;
    color: ${palette.blue.dark3};
    background-color: ${palette.blue.light2};

    // The focus wedge
    &:before {
      transform: scaleY(1);
      background-color: ${palette.blue.light1};
    }
  }
`;

export const focusedDisabledNavItemStyle = css`
  &:focus {
    color: ${palette.blue.light1};
    background-color: ${transparentize(0.1, palette.blue.light3)};

    &:before {
      content: unset;
    }
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
