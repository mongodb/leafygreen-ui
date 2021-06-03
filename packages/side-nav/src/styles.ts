import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

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
    border-left: 3px solid ${uiColors.gray.light1};
    padding-left: ${8 + indentLevel * 8}px;
  `;
}
