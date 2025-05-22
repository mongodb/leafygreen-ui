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

export const drawerClassName = createUniqueClassName('lg-drawer');

const drawerIn = keyframes`
  0% {
    transform: translate3d(0%, 0, 0);
    opacity: 0;
    visibility: hidden;
  }
  2%{

  transform: translate3d(100%, 0, 0);
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
`;

const drawerOut = keyframes`
  from {
    transform: translate3d(0%, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
`;

// const drawerOutMobile = keyframes`
//   from {
//     grid-template-columns: ${TOOLBAR_WIDTH}px calc(100vw - ${
//   TOOLBAR_WIDTH * 2
// }px);
//   },
//   to {
//     grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
//   }
// `;

// const drawerInMobile = keyframes`
//   from {
//     grid-template-columns: ${TOOLBAR_WIDTH}px 1px;
//   },
//   to {
//     grid-template-columns: ${TOOLBAR_WIDTH}px calc(100vw - ${
//   TOOLBAR_WIDTH * 2
// }px);
//   }
// `;

const getBaseStyles = ({ open, theme }: { open: boolean; theme: Theme }) => css`
  all: unset;
  padding: 0;
  background-color: ${color[theme].background.primary.default};

  // TODO: mobile borders
  /* border-left: ${open ? '1px solid' : 'none'};
  border-top: ${open ? '1px solid' : 'none'};
  border-bottom: ${open ? '1px solid' : 'none'};
  border-color: ${open
    ? color[theme].border.secondary.default
    : 'transparent'}; */
  border: 1px solid ${color[theme].border.secondary.default};
  width: 100%;
  max-width: ${PANEL_WIDTH}px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  transition: height ${drawerTransitionDuration}ms ease-in-out;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    max-width: 100%;
    height: 50vh;
  }
`;

const overlayOpenStyles = css`
  opacity: 1;
  /* transform: none; */
  /* transform: translate3d(0, 0, 0); */

  animation-name: ${drawerIn};
  animation-fill-mode: forwards;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transform: none;
  }
`;

const overlayClosedStyles = css`
  /* opacity: 0; */
  /* transform: translate3d(99%, 0, 0); */
  pointer-events: none;

  animation-name: ${drawerOut};
  animation-fill-mode: forwards;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transform: translate3d(0, 100%, 0);
  }
`;

const getOverlayStyles = ({
  open,
  zIndex,
}: {
  open: boolean;
  zIndex: number;
}) =>
  cx(
    css`
      position: absolute;
      /* position: fixed; */
      z-index: ${zIndex};
      top: 0;
      bottom: 0;
      right: 0;
      overflow: visible;
      /* transition: transform ${drawerTransitionDuration}ms ease-in-out,
        opacity ${drawerTransitionDuration}ms ease-in-out
          ${open ? '0ms' : `${drawerTransitionDuration}ms`}; */
      /* transform: translate3d(99%, 0, 0); */

      animation-timing-function: ease-in-out;
      animation-duration: ${drawerTransitionDuration}ms;

      @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        top: unset;
        left: 0;
      }
    `,
    {
      [overlayOpenStyles]: open,
      [overlayClosedStyles]: !open,
    },
  );

const getDisplayModeStyles = ({
  displayMode,
  open,
  zIndex,
}: {
  displayMode: DisplayMode;
  open: boolean;
  zIndex: number;
}) =>
  cx({
    [getOverlayStyles({ open, zIndex })]: displayMode === DisplayMode.Overlay,
  });

export const getDrawerStyles = ({
  className,
  displayMode,
  open,
  theme,
  zIndex,
}: {
  className?: string;
  displayMode: DisplayMode;
  open: boolean;
  theme: Theme;
  zIndex: number;
}) =>
  cx(
    getBaseStyles({ open, theme }),
    getDisplayModeStyles({ displayMode, open, zIndex }),
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

const getDrawerShadowStyles = ({ theme }: { theme: Theme }) => css`
  ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    ${addOverflowShadow({ isInside: false, side: Side.Top, theme })};
  }
`;

export const getInnerContainerStyles = ({
  displayMode,
  theme,
}: {
  displayMode: DisplayMode;
  theme: Theme;
}) =>
  cx(getBaseInnerContainerStyles({ theme }), {
    [getDrawerShadowStyles({ theme })]: displayMode === DisplayMode.Overlay,
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

export const innerChildrenContainerStyles = cx(
  baseInnerChildrenContainerStyles,
  scrollContainerStyles,
);
