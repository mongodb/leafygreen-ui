import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { sideNavItemSidePadding } from '../styles';

export const buttonClassName = createUniqueClassName('side-nav-group-button');

export const listItemStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;

  & ~ & > .${buttonClassName} {
    padding: 16px ${sideNavItemSidePadding}px 8px ${sideNavItemSidePadding}px;
  }
`;

export const labelStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1em;
  letter-spacing: 0.3px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${palette.green.dark2};
  min-height: ${spacing[5]}px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 8px 16px;

  &:not(:first-of-type) {
    margin-top: ${spacing[1]}px;
  }
`;

export const collapsibleLabelStyle = css`
  background-color: transparent;
  border: none;
  margin: 0px;
  transition: border-color 150ms ease-in-out, color 150ms ease-in-out;
  cursor: pointer;
  border-bottom: 1px solid ${palette.gray.light2};

  &:hover {
    border-color: ${palette.green.base};
  }

  &:focus {
    outline: none;
  }
`;

export const customIconStyles = css`
  margin-right: ${spacing[2]}px;

  // When the glyph is the last child, we remove the margin
  // used to space it from the text. This matters in the navigation
  // collapsed state.
  &:last-child {
    margin-right: 0;
  }
`;

export const collapsibleHeaderFocusStyle = css`
  &:focus {
    color: ${palette.blue.dark3};
    border-color: ${palette.blue.light1};
    background-color: ${palette.blue.light2};

    & svg {
      color: ${palette.blue.base};
    }
  }
`;

export const expandIconStyle = css`
  transition: 150ms all ease-in-out;
  margin-left: ${spacing[2]}px;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

export const openExpandIconStyle = css`
  transform: rotate(90deg);
`;

export const defaultStyle = css`
  transition: all 150ms ease-in-out;
  max-height: 0;
  overflow: hidden;
  opacity: 1;

  ${prefersReducedMotion(`
    transition: opacity 150ms ease-in-out;
  `)}
`;

export const transitionStyles = {
  entering: css`
    opacity: 0;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
};
