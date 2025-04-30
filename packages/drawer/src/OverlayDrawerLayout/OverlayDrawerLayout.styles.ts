import { css, cx } from '@leafygreen-ui/emotion';

import { GRID_AREAS } from '../constants';
import { TOOLBAR_WIDTH } from '../Drawer';

const baseStyles = css`
  width: 100%;
  position: relative;
  height: inherit;
`;

const drawerBaseStyles = css`
  display: grid;
  grid-template-columns: auto 0px;
`;

const toolbarBaseStyles = css`
  display: grid;
  grid-template-columns: auto ${TOOLBAR_WIDTH}px;
  grid-template-areas: '${GRID_AREAS.content} ${GRID_AREAS.drawer}';
`;

export const getOverlayDrawerLayoutStyles = ({
  className,
  hasToolbar = false,
}: {
  className?: string;
  hasToolbar?: boolean;
}) =>
  cx(
    baseStyles,
    {
      [toolbarBaseStyles]: hasToolbar,
      [drawerBaseStyles]: !hasToolbar,
    },
    className,
  );
