import { css, cx } from '@leafygreen-ui/emotion';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  DRAWER_TOOLBAR_WIDTH,
  GRID_AREA,
  TRANSITION_DURATION,
  TRANSITION_TIMING_FUNCTION,
} from '../constants';
import { MOBILE_BREAKPOINT } from '../Drawer/Drawer.constants';

const baseStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  transition-property: grid-template-columns, grid-template-rows;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  transition-duration: ${TRANSITION_DURATION}ms;
  overflow: hidden;
  position: relative;
  height: 100%;
`;

const withoutToolbarBaseStyles = css`
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: 100% 0;
  }
`;

// If there is no toolbar and the drawer is open, we need to shift the layout by the panel width;
const withoutToolbarOpenStyles = css`
  grid-template-columns: 1fr auto;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-rows: 50% 50%;
  }
`;

const withToolbarBaseStyles = css`
  grid-template-columns: auto ${DRAWER_TOOLBAR_WIDTH}px;
  grid-template-areas: '${GRID_AREA.content} ${GRID_AREA.drawer}';
`;

// If there is a toolbar and the drawer is open, we need to shift the layout by toolbar width + panel width;
const withToolbarOpenStyles = css`
  grid-template-columns: 1fr auto;

  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    grid-template-columns: auto ${DRAWER_TOOLBAR_WIDTH}px;
  }
`;

export const getEmbeddedDrawerLayoutStyles = ({
  className,
  isDrawerOpen,
  hasToolbar = false,
}: {
  className?: string;
  isDrawerOpen?: boolean;
  hasToolbar?: boolean;
}) =>
  cx(
    baseStyles,
    {
      [withToolbarBaseStyles]: hasToolbar,
      [withToolbarOpenStyles]: isDrawerOpen && hasToolbar,
      [withoutToolbarBaseStyles]: !hasToolbar,
      [withoutToolbarOpenStyles]: isDrawerOpen && !hasToolbar,
    },
    className,
  );
