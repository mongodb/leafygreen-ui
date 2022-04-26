import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';

export const sideNavClassName = createUniqueClassName('side-nav');
export const sideNavItemSidePadding = 16;
export const sideNavWidth = 184;
export const collapseDuration = 200;

export const ulStyleOverrides = css`
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0;
  list-style-type: none;
`;

export function getIndentLevelStyle(indentLevel: number) {
  return css`
    border-left: 3px solid ${palette.gray.light1};
    padding-left: ${8 + indentLevel * 8}px;
  `;
}

export const navStyles = css`
  font-family: ${fontFamilies.default};
  background-color: ${palette.gray.light3};
  border-right: 1px solid ${palette.gray.light2};
  position: relative;
  z-index: 0;
  // TODO: don't transition all
  transition: all ${collapseDuration}ms ease-in-out;

  ${prefersReducedMotion(`
    transition: all ${collapseDuration}ms ease-in-out, width 0ms linear;
  `)}
`;

export const collapsedNavStyles = css`
  width: 48px;
`;

export const hoverNavStyles = css`
  box-shadow: 2px 0 4px ${transparentize(0.9, palette.black)};
  border-right-color: ${palette.gray.light3};
`;

export const listWrapper = css`
  transition: ${collapseDuration}ms ease-in-out;
  transition-property: opacity, transform;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;

  ${prefersReducedMotion(`
    transition: opacity ${collapseDuration}ms ease-in-out;
  `)}
`;

export const listStyles = css`
  padding-top: ${spacing[3]}px;
  padding-bottom: ${spacing[3]}px;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const wrapper = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;

export const space = css`
  transition: width ${collapseDuration}ms ease-in-out;
  position: relative;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

export const collapsedSpace = css`
  width: 48px;
`;

export const expandedEnteredStyle = css`
  transform: translate3d(0, ${spacing[2]}px, 0);
  opacity: 0;
  pointer-events: none;
`;

export const expandedExitedStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

export const collapsedEnteredStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

export const collapsedExitedStyle = css`
  transform: translate3d(0, -${spacing[2]}px, 0);
  opacity: 0;
  pointer-events: none;
`;

export const typographyStyle = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
  `,
} as const;
