import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, breakpoints, Side } from '@leafygreen-ui/tokens';
import { toolbarClassName } from '@leafygreen-ui/toolbar';

import {
  DRAWER_TOOLBAR_WIDTH,
  EMBEDDED_TOOLBAR_OVERFLOW_PADDING,
  GRID_AREA,
  TRANSITION_DURATION,
  TRANSITION_TIMING_FUNCTION,
} from '../../constants';
import { drawerClassName } from '../../Drawer/Drawer.styles';
import { DisplayMode, Size } from '../../Drawer/Drawer.types';
import { getDrawerWidth } from '../../Drawer/Drawer.utils';

const MOBILE_BREAKPOINT = breakpoints.Tablet;
const SHADOW_WIDTH = 36; // Width of the shadow padding on the left side

const drawerOutMobile = keyframes`
  from {
    grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px calc(100vw - ${
  DRAWER_TOOLBAR_WIDTH * 2
}px);
  }
  to {
    grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px 0px;
  }
`;

const drawerInMobile = keyframes`
  from {
    grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px 1px;
  }
  to {
    grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px calc(100vw - ${
  DRAWER_TOOLBAR_WIDTH * 2
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

const getOpenOverlayStyles = (size: number) => css`
  grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px ${size}px;
`;

const getClosedOverlayStyles = (size: number) => css`
  grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px 0px;
`;

const openEmbeddedStyles = css`
  grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px auto;
  // To show focus outline since the wrapper has overflow hidden
  padding-left: ${EMBEDDED_TOOLBAR_OVERFLOW_PADDING}px;
  margin-left: -${EMBEDDED_TOOLBAR_OVERFLOW_PADDING}px;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerInMobile};
    animation-fill-mode: forwards;
  }
`;

const closedEmbeddedStyles = css`
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    animation-name: ${drawerOutMobile};
    animation-fill-mode: forwards;
  }
`;

const baseEmbeddedStyles = css`
  transition-property: grid-template-columns;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  grid-template-columns: 1fr auto;
  width: 100%;
`;

const getOverlayShadowStyles = ({ theme }: { theme: Theme }) => css`
  ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};

  // Need this to show the box shadow since we are using overflow: hidden
  padding-left: ${SHADOW_WIDTH}px;

  &::before {
    transition-property: opacity;
    transition-duration: ${TRANSITION_DURATION}ms;
    transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
    opacity: 1;
    left: ${SHADOW_WIDTH}px;
  }
`;

const baseStyles = css`
  display: grid;
  grid-template-columns: ${DRAWER_TOOLBAR_WIDTH}px 0px;
  grid-template-areas: '${GRID_AREA.toolbar} ${GRID_AREA.innerDrawer}';
  grid-area: ${GRID_AREA.drawer};
  justify-self: end;
  animation-timing-function: ${TRANSITION_TIMING_FUNCTION};
  animation-duration: ${TRANSITION_DURATION}ms;
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
  transition-property: grid-template-columns;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  grid-template-columns: 1fr auto;

  .${drawerClassName} {
    width: 100%;
  }
`;

const closedOverlayShadowStyles = css`
  padding-left: 0;
  animation-name: ${drawerPaddingOut};
  animation-timing-function: ${TRANSITION_TIMING_FUNCTION};
  animation-duration: ${TRANSITION_DURATION}ms;

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
  size: sizeProp = Size.Default,
}: {
  className?: string;
  isDrawerOpen?: boolean;
  shouldAnimate?: boolean;
  displayMode?: DisplayMode;
  theme: Theme;
  size?: Size;
}) => {
  const isOverlay = displayMode === DisplayMode.Overlay;
  const isEmbedded = displayMode === DisplayMode.Embedded;
  const size = getDrawerWidth({ size: sizeProp }).withToolbar;

  return cx(
    baseStyles,
    {
      [getOverlayShadowStyles({ theme })]: isOverlay,
      [closedOverlayShadowStyles]: isOverlay && !isDrawerOpen,
      [baseOverlayStyles]: isOverlay,
      [getOpenOverlayStyles(size)]: isDrawerOpen && isOverlay,
      [getClosedOverlayStyles(size)]: !isDrawerOpen && isOverlay, // This ensures that the drawer does not animate closed on initial render
      [baseEmbeddedStyles]: isEmbedded,
      [openEmbeddedStyles]: isDrawerOpen && isEmbedded,
      [closedEmbeddedStyles]: !isDrawerOpen && isEmbedded,
    },
    className,
  );
};
