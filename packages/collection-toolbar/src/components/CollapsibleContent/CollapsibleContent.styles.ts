import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const collapsibleContentBaseStyles = css`
  display: grid;
  transition-property: grid-template-rows, margin-bottom, opacity;
  transition-duration: ${transitionDuration.default}ms;
  transition-timing-function: ease-in-out;
  grid-template-rows: 1fr;
  margin-bottom: 0;
  opacity: 1;
  gap: ${spacing[200]}px;
`;

const collapsibleContentCollapsedStyles = css`
  grid-template-rows: 0fr;
  opacity: 0;
`;

export const getCollapsibleContentStyles = ({
  isCollapsed,
}: {
  isCollapsed?: boolean;
}) =>
  cx(collapsibleContentBaseStyles, {
    [collapsibleContentCollapsedStyles]: isCollapsed,
  });
