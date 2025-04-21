import { css, cx } from '@leafygreen-ui/emotion';

import {
  DisplayMode,
  MOBILE_BREAKPOINT,
  PANEL_WIDTH,
  TOOLBAR_WIDTH,
} from '../Drawer';
import { drawerTransitionDuration } from '../Drawer/Drawer.styles';

const baseStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: auto 0;
  transition: all ${drawerTransitionDuration}ms linear;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: auto 0;
  }
`;

const drawerOpenStyles = css`
  grid-template-columns: auto ${PANEL_WIDTH}px;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: 50% 50%;
  }
`;

// TODO: mobile
const toolbarStyles = css`
  grid-template-columns: auto ${TOOLBAR_WIDTH}px;
  grid-template-areas: 'main drawer';
`;

const toolbarEmbeddedOpenStyles = css`
  grid-template-columns: auto ${PANEL_WIDTH + TOOLBAR_WIDTH}px;
`;

export const getEmbeddedDrawerLayoutStyles = ({
  className,
  isDrawerOpen,
  hasToolbar = false,
  displayMode = DisplayMode.Embedded,
}: {
  className?: string;
  isDrawerOpen: boolean;
  hasToolbar?: boolean;
  displayMode?: DisplayMode;
}) =>
  cx(
    baseStyles,
    {
      [drawerOpenStyles]: isDrawerOpen && !hasToolbar,
      [toolbarStyles]: hasToolbar,
      [toolbarEmbeddedOpenStyles]:
        hasToolbar && isDrawerOpen && displayMode === DisplayMode.Embedded,
    },
    className,
  );

// When hasToolbar is true, we need to shift the layout by 48px;
// When hasToolbar is true and isDrawerOpen is true and the displayMode is embedded, we need to shift the layout by 48px + 432px;
// When hasToolbar is true and isDrawerOpen is true and the displayMode is overlay, the layout remains the same;
