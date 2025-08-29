import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, Side } from '@leafygreen-ui/tokens';
import { toolbarClassName } from '@leafygreen-ui/toolbar';

import {
  DRAWER_TOOLBAR_WIDTH,
  EMBEDDED_TOOLBAR_OVERFLOW_PADDING,
  GRID_AREA,
  MOBILE_BREAKPOINT,
  TRANSITION_DURATION,
  TRANSITION_TIMING_FUNCTION,
} from '../../constants';
import { drawerClassName } from '../../Drawer/Drawer.styles';
import { DisplayMode, Size } from '../../Drawer/Drawer.types';
import { getDrawerWidth } from '../../Drawer/Drawer.utils';

const SHADOW_WIDTH = 36; // Width of the shadow padding on the left side

const getOpenOverlayStyles = (size: number, hasToolbar: boolean) => css`
  grid-template-columns: ${hasToolbar
    ? `${DRAWER_TOOLBAR_WIDTH}px ${size}px`
    : `${size}px`};

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: ${hasToolbar
      ? `${DRAWER_TOOLBAR_WIDTH}px calc(100vw - ${DRAWER_TOOLBAR_WIDTH}px)`
      : `100vw`};
  }
`;

const getClosedOverlayStyles = (hasToolbar: boolean) => css`
  grid-template-columns: ${hasToolbar
    ? `${DRAWER_TOOLBAR_WIDTH}px 0px`
    : `0px`};
`;

const baseEmbeddedStyles = css`
  width: 100%;
`;

const getOpenEmbeddedStyles = (hasToolbar: boolean) => css`
  grid-template-columns: ${hasToolbar
    ? `${DRAWER_TOOLBAR_WIDTH}px auto`
    : `auto`};

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: auto;
    grid-template-columns: ${hasToolbar
      ? `${DRAWER_TOOLBAR_WIDTH}px calc(100vw - ${DRAWER_TOOLBAR_WIDTH}px)`
      : `100vw`};
  }
`;

const openEmbeddedPaddingStyles = css`
  // Allows the focus outline since the wrapper has overflow hidden
  padding-left: ${EMBEDDED_TOOLBAR_OVERFLOW_PADDING}px;
  margin-left: -${EMBEDDED_TOOLBAR_OVERFLOW_PADDING}px;
`;

const getClosedEmbeddedStyles = (hasToolbar: boolean) => css`
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: ${hasToolbar
      ? `${DRAWER_TOOLBAR_WIDTH}px 0px`
      : `0px`};
  }
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

const getBaseStyles = (hasToolbar: boolean) => css`
  display: grid;
  grid-template-columns: ${hasToolbar
    ? `${DRAWER_TOOLBAR_WIDTH}px 0px`
    : `0px`};
  grid-template-areas: ${hasToolbar
    ? `'${GRID_AREA.toolbar} ${GRID_AREA.innerDrawer}'`
    : `'${GRID_AREA.innerDrawer}'`};
  grid-area: ${GRID_AREA.drawer};
  justify-self: end;
  animation-timing-function: ${TRANSITION_TIMING_FUNCTION};
  animation-duration: ${TRANSITION_DURATION}ms;
  z-index: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition-property: grid-template-columns;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};

  .${toolbarClassName} {
    grid-area: ${GRID_AREA.toolbar};
  }

  .${drawerClassName} {
    grid-area: ${GRID_AREA.innerDrawer};
    position: unset;
    transform: unset;
    overflow: hidden;
    opacity: 1;
    border-right: 0;
    height: 100%;
    animation: none;
    width: 100%;
    ${hasToolbar ? 'border-left: 0;' : ''}

    > div::before {
      box-shadow: unset;
    }
  }
`;

const closedOverlayShadowStyles = css`
  padding-left: 0;

  ::before {
    opacity: 0;
  }
`;

export const getEmbeddedStyles = ({
  hasToolbar,
  isDrawerOpen,
}: {
  hasToolbar: boolean;
  isDrawerOpen?: boolean;
}) =>
  cx(baseEmbeddedStyles, {
    [getOpenEmbeddedStyles(hasToolbar)]: isDrawerOpen,
    [openEmbeddedPaddingStyles]: isDrawerOpen && hasToolbar,
    [getClosedEmbeddedStyles(hasToolbar)]: !isDrawerOpen,
  });

export const getOverlayStyles = ({
  hasToolbar,
  isDrawerOpen,
  size,
  theme,
}: {
  hasToolbar: boolean;
  isDrawerOpen?: boolean;
  size: number;
  theme: Theme;
}) =>
  cx(getOverlayShadowStyles({ theme }), {
    [cx(closedOverlayShadowStyles, getClosedOverlayStyles(hasToolbar))]:
      !isDrawerOpen,
    [getOpenOverlayStyles(size, hasToolbar)]: isDrawerOpen,
  });

export const getPanelGridStyles = ({
  className,
  isDrawerOpen,
  displayMode,
  theme,
  hasToolbar,
  size: sizeProp = Size.Default,
}: {
  className?: string;
  isDrawerOpen?: boolean;
  displayMode?: DisplayMode;
  theme: Theme;
  hasToolbar: boolean;
  size?: Size;
}) => {
  const isOverlay = displayMode === DisplayMode.Overlay;
  const isEmbedded = displayMode === DisplayMode.Embedded;
  const drawerWidth = getDrawerWidth({ size: sizeProp });
  const size = hasToolbar ? drawerWidth.withToolbar : drawerWidth.default;

  return cx(
    getBaseStyles(hasToolbar),
    {
      [getOverlayStyles({ hasToolbar, isDrawerOpen, size, theme })]: isOverlay,
      [getEmbeddedStyles({ hasToolbar, isDrawerOpen })]: isEmbedded,
    },
    className,
  );
};
