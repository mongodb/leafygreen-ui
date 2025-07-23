import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

export const tabContainerClassName = createUniqueClassName('tab-container');
export const tabListElementClassName = createUniqueClassName('tab-list');
export const inlineChildrenContainerClassName = createUniqueClassName(
  'tabs-inline_children',
);
export const tabPanelsElementClassName = createUniqueClassName('tab-panels');

const getBaseTabContainerStyles = (theme: Theme) => css`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  /* Using a background allows the "border" to appear underneath the individual tab color */
  background: linear-gradient(
    0deg,
    ${color[theme].border.secondary.default} 1px,
    rgb(255 255 255 / 0%) 1px
  );
`;

export const getTabContainerStyles = (theme: Theme) =>
  cx(getBaseTabContainerStyles(theme), tabContainerClassName);

const baseTabListStyles = css`
  list-style: none;
  padding: 0;
  display: flex;
  width: 100%;
  overflow-x: auto;

  /* Remove scrollbar */

  /* Chrome, Edge, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
`;

export const tabListStyles = cx(baseTabListStyles, tabListElementClassName);

const baseInlineChildrenContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const inlineChildrenContainerStyles = cx(
  baseInlineChildrenContainerStyles,
  inlineChildrenContainerClassName,
);
