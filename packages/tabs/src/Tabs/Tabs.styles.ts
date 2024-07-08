import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

export const tabListElementClassName = createUniqueClassName('tab-list');
export const tabPanelsElementClassName = createUniqueClassName('tab-panels');

export const tabContainerStyle = css`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

export const getListThemeStyles = (theme: Theme) => css`
  list-style: none;
  padding: 0;
  display: flex;
  width: 100%;
  overflow-x: auto;

  /* Using a background allows the "border" to appear underneath the individual tab color */
  background: linear-gradient(
    0deg,
    ${color[theme].border.secondary.default} 1px,
    rgb(255 255 255 / 0%) 1px
  );

  /* Remove scrollbar */

  /* Chrome, Edge, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
`;

export const inlineChildrenContainerStyle = css`
  display: flex;
`;

export const inlineChildrenWrapperStyle = css`
  display: flex;
  align-items: center;
`;
