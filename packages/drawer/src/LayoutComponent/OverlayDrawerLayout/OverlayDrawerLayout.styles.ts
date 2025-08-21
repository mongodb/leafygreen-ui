import { DRAWER_TOOLBAR_WIDTH, GRID_AREA } from '../../constants';

import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, Side, breakpoints } from '@leafygreen-ui/tokens';
import { toolbarClassName } from '@leafygreen-ui/toolbar';

import {
  TRANSITION_DURATION,
  TRANSITION_TIMING_FUNCTION,
} from '../../constants';
import { drawerClassName } from '../../Drawer/Drawer.styles';
import { DisplayMode, Size } from '../../Drawer/Drawer.types';
import { getDrawerWidth } from '../../Drawer/Drawer.utils';

const baseStyles = css`
  width: 100%;
  position: relative;
  height: inherit;
`;

const drawerBaseStyles = css`
  display: grid;
  grid-template-columns: auto 0px;
  grid-template-areas: '${GRID_AREA.content} ${GRID_AREA.drawer}';
  overflow: hidden;
`;

const toolbarBaseStyles = css`
  display: grid;
  grid-template-columns: auto ${DRAWER_TOOLBAR_WIDTH}px;
  grid-template-areas: '${GRID_AREA.content} ${GRID_AREA.drawer}';
  height: 100%;
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

const MOBILE_BREAKPOINT = breakpoints.Tablet;
const SHADOW_WIDTH = 36; // Width of the shadow padding on the left side

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
  grid-template-columns: 0px ${size}px;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: 0px calc(100vw - ${DRAWER_TOOLBAR_WIDTH}px);
  }
`;

const getClosedOverlayStyles = (size: number) => css`
  grid-template-columns: 0px 0px;
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

const baseWrapperStyles = css`
  display: grid;
  grid-template-columns: 0px 0px;
  grid-template-areas: 'filler ${GRID_AREA.innerDrawer}';
  grid-area: ${GRID_AREA.drawer};
  justify-self: end;
  z-index: 0;
  height: 100%;
  overflow: hidden;
  position: relative;

  .${drawerClassName} {
    grid-area: ${GRID_AREA.innerDrawer};
    position: unset;
    transform: unset;
    overflow: hidden;
    opacity: 1;
    /* border-left: 0; */
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

export const getOverlayDrawerWrapperStyles = ({
  className,
  isDrawerOpen,
  theme,
  size: sizeProp = Size.Default,
}: {
  className?: string;
  isDrawerOpen?: boolean;
  theme: Theme;
  size?: Size;
}) => {
  const size = getDrawerWidth({ size: sizeProp }).default;

  return cx(
    baseWrapperStyles,
    getOverlayShadowStyles({ theme }),
    baseOverlayStyles,
    {
      [closedOverlayShadowStyles]: !isDrawerOpen,
      [getOpenOverlayStyles(size)]: isDrawerOpen,
      [getClosedOverlayStyles(size)]: !isDrawerOpen,
    },
    className,
  );
};
