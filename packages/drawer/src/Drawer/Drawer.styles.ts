import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import {
  addOverflowShadow,
  color,
  Side,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import {
  HEADER_HEIGHT,
  MOBILE_BREAKPOINT,
  PANEL_WIDTH,
} from './Drawer.constants';
import { DisplayMode } from './Drawer.types';

export const drawerTransitionDuration = transitionDuration.slower;

export const drawerClassName = createUniqueClassName('drawer');

// const drawerIn = keyframes`
//   from {
//     // explain why this is 1px
//     transform: translate3d(-1%, 0, 0);
//     /* transform: translate3d(99%, 0, 0); */
//   },
//   to {
//     transform: translate3d(-100%, 0, 0);
//     /* transform: translate3d(0%, 0, 0); */

//   }
// `;

// const drawerOut = keyframes`
//   from {
//     transform: translate3d(-100%, 0, 0);
//     /* transform: translate3d(0%, 0, 0); */
//   },
//   to {
//     transform: translate3d(0%, 0, 0);
//     /* transform: translate3d(100%, 0, 0); */

//   }
// `;

const getBaseStyles = ({ open, theme }: { open: boolean; theme: Theme }) => css`
  all: unset;
  margin: 0;
  padding: 0;
  background-color: ${color[theme].background.primary.default};
  border: ${open
    ? `1px solid ${color[theme].border.secondary.default}`
    : 'none'};
  width: 100%;
  max-width: ${PANEL_WIDTH}px;
  height: 100%;

  overflow: hidden;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    max-width: 100%;
    height: 50vh;
  }
`;

const overlayOpenStyles = css`
  opacity: 1;
  transform: none;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transform: none;
  }
`;

const overlayClosedStyles = css`
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  pointer-events: none;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transform: translate3d(0, 100%, 0);
  }
`;

// const overlayOpenStyles = css`
//   animation-name: ${drawerIn};
//   animation-fill-mode: forwards;
//   width: 432px;
// `;

// const overlayClosedStyles = css`
//   animation-name: ${drawerOut};
// `;

const getOverlayStyles = ({
  open,
  zIndex,
  shouldAnimate,
}: {
  open: boolean;
  zIndex: number;
  shouldAnimate?: boolean;
}) =>
  cx(
    css`
      position: fixed;
      z-index: ${zIndex};
      top: 0;
      bottom: 0;
      right: 0;
      overflow: visible;
      transition: transform ${drawerTransitionDuration}ms ease-in-out,
        opacity ${drawerTransitionDuration}ms ease-in-out
          ${open ? '0ms' : `${drawerTransitionDuration}ms`};

      @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        top: unset;
        left: 0;
      }

      /* animation-timing-function: linear;
      animation-duration: ${drawerTransitionDuration}ms;
      transform: translate3d(0%, 0, 0);
      width: 432px; */
    `,
    {
      [overlayOpenStyles]: open,
      [overlayClosedStyles]: !open,
    },
  );

const embeddedOpenStyles = css`
  width: 100%;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 50vh;
  }
`;

const embeddedClosedStyles = css`
  /* width: 0; */
  /* right: -${PANEL_WIDTH}px; */

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    height: 0;
  }
`;

const getEmbeddedStyles = ({ open }: { open: boolean }) =>
  cx(
    css`
      position: relative;
      overflow: auto;
    `,
    {
      [embeddedOpenStyles]: open,
      [embeddedClosedStyles]: !open,
    },
  );

const getDisplayModeStyles = ({
  displayMode,
  open,
  zIndex,
  shouldAnimate,
}: {
  displayMode: DisplayMode;
  open: boolean;
  zIndex: number;
  shouldAnimate?: boolean;
}) =>
  cx({
    [getOverlayStyles({ open, zIndex, shouldAnimate })]:
      displayMode === DisplayMode.Overlay,
    [getEmbeddedStyles({ open })]: displayMode === DisplayMode.Embedded,
  });

export const getDrawerStyles = ({
  className,
  displayMode,
  open,
  theme,
  zIndex,
  shouldAnimate,
}: {
  className?: string;
  displayMode: DisplayMode;
  open: boolean;
  theme: Theme;
  zIndex: number;
  shouldAnimate?: boolean;
}) =>
  cx(
    getBaseStyles({ open, theme }),
    getDisplayModeStyles({ displayMode, open, zIndex, shouldAnimate }),
    className,
    drawerClassName,
  );

const getBaseInnerContainerStyles = ({ theme }: { theme: Theme }) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color[theme].background.primary.default};
`;

// const getDrawerShadowStyles = ({ theme }: { theme: Theme }) => css`
//   ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};

//   @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
//     ${addOverflowShadow({ isInside: false, side: Side.Top, theme })};
//   }
// `;

export const getInnerContainerStyles = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  displayMode,
  theme,
}: {
  displayMode: DisplayMode;
  theme: Theme;
}) =>
  cx(getBaseInnerContainerStyles({ theme }), {
    // [getDrawerShadowStyles({ theme })]: displayMode === DisplayMode.Overlay,
  });

export const getHeaderStyles = ({
  hasTabs,
  theme,
}: {
  hasTabs: boolean;
  theme: Theme;
}) => css`
  height: ${HEADER_HEIGHT}px;
  padding: ${spacing[400]}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${hasTabs
    ? 'none'
    : `1px solid ${color[theme].border.secondary.default}`};
  transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
`;

const baseChildrenContainerStyles = css`
  height: 100%;
  overflow: hidden;
`;

export const getChildrenContainerStyles = ({
  hasShadowTop,
  theme,
}: {
  hasShadowTop: boolean;
  theme: Theme;
}) =>
  cx(baseChildrenContainerStyles, {
    [addOverflowShadow({ isInside: true, side: Side.Top, theme })]:
      hasShadowTop,
  });

const baseInnerChildrenContainerStyles = css`
  height: 100%;
`;

const scrollContainerStyles = css`
  padding: ${spacing[400]}px;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const getInnerChildrenContainerStyles = ({
  hasTabs,
}: {
  hasTabs: boolean;
}) =>
  cx(baseInnerChildrenContainerStyles, {
    [scrollContainerStyles]: !hasTabs,
  });

// when overlay
// the drawer is curerntly position fixed and is transformed off screen
// it should be position absolute instead becuase it should be 100% of the parent container

// with the toolbar, the main wrapper should be shifted to the left
// the toolbar should also be position absolute

// when the drawer is open, the main layout remains the same
// the toolbar will transfom to the right and so will the drawer

// embedded drawer

// case 1:
// embedded drawer with toolbar
// - needs DrawerLayout

// case 2:
// embedded drawer without toolbar
// - does not needs DrawerLayout

// overlay drawer

// case 3:
// overlay drawer with toolbar
// - needs DrawerLayout

// case 4:
// overlay drawer without toolbar
// - does not needs DrawerLayout
