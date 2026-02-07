import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const collapsibleContentBaseStyles = css`
  display: grid;
  width: -webkit-fill-available;
  transition-property: height, grid-template-rows, opacity, visibility;
  transition-duration: ${transitionDuration.slower}ms;
  transition-timing-function: ease-in-out;

  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
`;

const collapsedStyles = css`
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
`;

export const getCollapsibleContentStyles = ({
  isCollapsed,
}: {
  isCollapsed?: boolean;
}) =>
  cx(collapsibleContentBaseStyles, {
    [collapsedStyles]: isCollapsed,
  });

export const innerContentWrapperStyles = css`
  display: grid;
  gap: ${spacing[200]}px;
  overflow: hidden;
  min-height: 0;
`;
