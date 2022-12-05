import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';
import { TransitionStatus } from 'react-transition-group';

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

export const outerContainerStyle = css`
  position: relative;
  transition: width ${collapseDuration}ms ease-in-out;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

export const outerContainerCollapsedStyle = css`
  width: 48px;
`;

export const innerNavWrapperStyle = css`
  /**
   * Setting position: absolute; here so the nav wrapper can appear
   * above the content in on the collapsed state. 
   */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;

export const navBaseStyles = css`
  position: relative;
  font-family: ${fontFamilies.default};

  z-index: 0;
  transition: ${collapseDuration}ms ease-in-out;
  transition-property: box-shadow, border-color, width;

  ${prefersReducedMotion(`
    transition-property: box-shadow, border-color;
  `)}
`;

export const navThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
};

export const hoverNavStyles = css`
  box-shadow: 2px 0 4px ${transparentize(0.9, palette.black)};
`;

export const collapsedNavStyles = css`
  width: 48px;
`;

export const listWrapperStyle = css`
  /**
  * Setting position: absolute so the expanded and collapsed menus
  * can be rendered in the same spot.
  * We transition the opacity & transform to display one or the other.
  */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  transition: ${collapseDuration}ms ease-in-out;
  transition-property: opacity, transform;

  ${prefersReducedMotion(`
    transition: opacity ${collapseDuration}ms ease-in-out;
  `)}
`;

export const listStyles = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-top: ${spacing[3]}px;
  padding-bottom: ${spacing[3]}px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const expandedMenu_EnteredStyle = css`
  transform: translate3d(0, ${spacing[2]}px, 0);
  opacity: 0;
  pointer-events: none;
`;

const expandedMenu_ExitedStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const collapsedMenu_EnteredStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const collapsedMenu_ExitedStyle = css`
  transform: translate3d(0, -${spacing[2]}px, 0);
  opacity: 0;
  pointer-events: none;
`;

export const expandedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: expandedMenu_EnteredStyle,
  entered: expandedMenu_EnteredStyle,
  exiting: expandedMenu_ExitedStyle,
  exited: expandedMenu_ExitedStyle,
} as const;

export const collapsedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: collapsedMenu_EnteredStyle,
  entered: collapsedMenu_EnteredStyle,
  exiting: collapsedMenu_ExitedStyle,
  exited: collapsedMenu_ExitedStyle,
} as const;

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
