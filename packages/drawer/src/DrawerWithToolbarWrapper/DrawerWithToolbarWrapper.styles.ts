import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, breakpoints, Side } from '@leafygreen-ui/tokens';
import { toolbarClassName } from '@leafygreen-ui/toolbar';

import { GRID_AREA, DRAWER_WITH_TOOLBAR_WIDTH } from '../constants';
import { TOOLBAR_WIDTH } from '../constants';
import {
  drawerClassName,
  drawerTransitionDuration,
} from '../Drawer/Drawer.styles';
import { DisplayMode } from '../Drawer/Drawer.types';

const MOBILE_BREAKPOINT = breakpoints.Tablet;
const SHADOW_WIDTH = 36; // Width of the shadow padding on the left side

const drawerIn = keyframes`
  from {
    // Because of .show() and .close() in the drawer component, transitioning from 0px to (x)px does not transition correctly. Using 1px along with css animations is a workaround to get the animation to work when the Drawer is embedded.
    grid-template-columns: ${TOOLBAR_WIDTH}px 1px;
  }
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px ${DRAWER_WITH_TOOLBAR_WIDTH}px;
  }
`;

const drawerOut = keyframes`
  from {
    grid-template-columns: ${TOOLBAR_WIDTH}px ${DRAWER_WITH_TOOLBAR_WIDTH}px;
  }
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
  }
`;

const drawerOutMobile = keyframes`
  from {
    grid-template-columns: ${TOOLBAR_WIDTH}px calc(100vw - ${
  TOOLBAR_WIDTH * 2
}px);
  }
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
  }
`;

const drawerInMobile = keyframes`
  from {
    grid-template-columns: ${TOOLBAR_WIDTH}px 1px;
  }
  to {
    grid-template-columns: ${TOOLBAR_WIDTH}px calc(100vw - ${
  TOOLBAR_WIDTH * 2
}px);
  }
`;

// This animation is used to animate the padding of the drawer when it closes, so that the padding does not block the content underneath it.
const drawerPaddingOut = keyframes`
  0% {
    padding-left: ${SHADOW_WIDTH}px;
  }
  99% {
    padding-left: ${SHADOW_WIDTH}px;
  }
  100% {
    padding-left: 0px;
  }
`;

const openOverlayStyles = css`
  animation-name: ${drawerIn};
  animation-fill-mode: forwards;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerInMobile};
  }
`;

const closedOverlayStyles = css`
  animation-name: ${drawerOut};

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerOutMobile};
  }
`;

const openEmbeddedStyles = css`
  /* grid-template-columns: ${TOOLBAR_WIDTH}px ${DRAWER_WITH_TOOLBAR_WIDTH}px; */
  grid-template-columns: ${TOOLBAR_WIDTH}px auto;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerInMobile};
    animation-fill-mode: forwards;
  }
`;

const closedEmbeddedStyles = css`
  grid-template-columns: ${TOOLBAR_WIDTH}px 0px;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerOutMobile};
    animation-fill-mode: forwards;
  }
`;

const baseEmbeddedStyles = css`
  transition-property: grid-template-columns;
  transition-duration: ${drawerTransitionDuration}ms;
  transition-timing-function: linear;
  grid-template-columns: 1fr auto;
`;

const getDrawerShadowStyles = ({ theme }: { theme: Theme }) => css`
  ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};

  // Need this to show the box shadow since we are using overflow: hidden
  padding-left: ${SHADOW_WIDTH}px;

  &::before {
    transition-property: opacity;
    transition-duration: ${drawerTransitionDuration}ms;
    transition-timing-function: linear;
    opacity: 1;
    left: ${SHADOW_WIDTH}px;
  }
`;

const baseStyles = css`
  display: grid;
  grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
  grid-template-areas: '${GRID_AREA.toolbar} ${GRID_AREA.innerDrawer}';
  grid-area: ${GRID_AREA.drawer};
  justify-self: end;
  animation-timing-function: linear;
  animation-duration: ${drawerTransitionDuration}ms;
  z-index: 0;
  height: 100%;
  overflow: hidden;
  position: relative;

  .${toolbarClassName} {
    grid-area: ${GRID_AREA.toolbar};
  }

  .${drawerClassName} {
    grid-area: ${GRID_AREA.innerDrawer};
    position: unset;
    transform: unset;
    overflow: hidden;
    opacity: 1;
    border-left: 0;
    border-right: 0;
    height: 100%;
    animation: none;

    > div::before {
      box-shadow: unset;
    }
  }
`;

const baseOverlayStyles = css`
  .${drawerClassName} {
    width: 100%;
  }
`;

const closedDrawerShadowStyles = css`
  padding-left: 0;
  animation-name: ${drawerPaddingOut};
  animation-timing-function: ease-in-out;
  animation-duration: ${drawerTransitionDuration}ms;

  ::before {
    opacity: 0;
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
  isDrawerOpen?: boolean;
  shouldAnimate?: boolean;
  displayMode?: DisplayMode;
  theme: Theme;
}) =>
  cx(
    baseStyles,
    {
      [getDrawerShadowStyles({ theme })]: displayMode === DisplayMode.Overlay,
      [closedDrawerShadowStyles]:
        displayMode === DisplayMode.Overlay && !isDrawerOpen,
      [baseOverlayStyles]: displayMode === DisplayMode.Overlay,
      [openOverlayStyles]: isDrawerOpen && displayMode === DisplayMode.Overlay, // TODO: is this only needed for overlay?
      [closedOverlayStyles]:
        !isDrawerOpen && shouldAnimate && displayMode === DisplayMode.Overlay, // This ensures that the drawer does not animate closed on initial render
      [openEmbeddedStyles]:
        isDrawerOpen && displayMode === DisplayMode.Embedded,
      [closedEmbeddedStyles]:
        !isDrawerOpen && displayMode === DisplayMode.Embedded, // This ensures that the drawer does not animate closed on initial render
      [baseEmbeddedStyles]: displayMode === DisplayMode.Embedded,
    },
    className,
  );
