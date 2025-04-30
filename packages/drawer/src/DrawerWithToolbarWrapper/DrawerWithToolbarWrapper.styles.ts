import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, breakpoints, Side } from '@leafygreen-ui/tokens';

import { GRID_AREAS } from '../constants';
import { PANEL_WIDTH, TOOLBAR_WIDTH } from '../Drawer/Drawer.constants';
import {
  drawerClassName,
  drawerTransitionDuration,
} from '../Drawer/Drawer.styles';
import { DisplayMode } from '../Drawer/Drawer.types';

const MOBILE_BREAKPOINT = breakpoints.Tablet;

const drawerIn = keyframes`
  from {
    // Because of .show() and .close() in the drawer component, transitioning from 0px to (x)px does not transition correctly. Using 1px along with css animations is a workaround to get the animation to work.
    grid-template-columns: ${TOOLBAR_WIDTH}px 1px;
  },
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px ${PANEL_WIDTH}px;
  }
`;

const drawerOut = keyframes`
  from {
    grid-template-columns: ${TOOLBAR_WIDTH}px ${PANEL_WIDTH}px;
  },
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
  }
`;

const drawerOutMobile = keyframes`
  from {
    grid-template-columns: ${TOOLBAR_WIDTH}px calc(100vw - ${
  TOOLBAR_WIDTH * 2
}px);
  },
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
  }
`;

const drawerInMobile = keyframes`
  from {
    grid-template-columns: ${TOOLBAR_WIDTH}px 1px;
  },
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px calc(100vw - ${
  TOOLBAR_WIDTH * 2
}px);
  }
`;

const openStyles = css`
  animation-name: ${drawerIn};
  animation-fill-mode: forwards;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerInMobile};
  }
`;

const closedStyles = css`
  animation-name: ${drawerOut};

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerOutMobile};
  }
`;

const getDrawerShadowStyles = ({ theme }: { theme: Theme }) => css`
  ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};
`;

const baseStyles = css`
  display: grid;
  grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
  grid-template-areas: '${GRID_AREAS.toolbar} ${GRID_AREAS.innerDrawer}';

  grid-area: ${GRID_AREAS.drawer};
  justify-self: end;
  animation-timing-function: ease-in-out;
  animation-duration: ${drawerTransitionDuration}ms;
  z-index: 0;
  height: inherit;

  .${drawerClassName} {
    position: unset;
    transition: none;
    transform: unset;
    overflow: hidden;
    opacity: 1;
    border-left: 0;
    height: 100%;
  }
`;

export const getDrawerWithToolbarWrapperStyles = ({
  className,
  isDrawerOpen,
  shouldAnimate,
  displayMode,
  theme,
}: {
  className?: string;
  isDrawerOpen: boolean;
  shouldAnimate?: boolean;
  displayMode: DisplayMode;
  theme: Theme;
}) =>
  cx(
    baseStyles,
    {
      [getDrawerShadowStyles({ theme })]:
        displayMode === DisplayMode.Overlay && isDrawerOpen,
      [openStyles]: isDrawerOpen,
      [closedStyles]: !isDrawerOpen && shouldAnimate,
    },
    className,
  );
