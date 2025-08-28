import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import {
  addOverflowShadow,
  color,
  fontWeights,
  Side,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import {
  EMBEDDED_TOOLBAR_OVERFLOW_PADDING,
  HEADER_HEIGHT,
  MOBILE_BREAKPOINT,
  TRANSITION_DURATION,
  TRANSITION_TIMING_FUNCTION,
} from '../constants';

import { DisplayMode, Size } from './Drawer.types';
import { getDrawerWidth } from './Drawer.utils';

export const drawerClassName = createUniqueClassName('lg-drawer');

// Because of .show() and .close() in the drawer component, transitioning from 0px to (x)px does not transition correctly. Having the drawer start at the open position while hidden, moving to the closed position, and then animating to the open position is a workaround to get the animation to work.
// These styles are used for a standalone drawer in overlay mode since it is not part of a grid layout.
const drawerIn = keyframes`
  0% {
    transform: translate3d(0%, 0, 0);
    opacity: 0;
    visibility: hidden; 
  }
  1% {
   transform: translate3d(100%, 0, 0);
    opacity: 1;
    visibility: visible;
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
`;

// Keep the drawer opacity at 1 until the end of the animation. The inner container opacity is transitioned separately.
const drawerOut = keyframes`
  0% {
    transform: translate3d(0%, 0, 0);
  }
  99% {
    transform: translate3d(100%, 0, 0);
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const getBaseStyles = ({ theme }: { theme: Theme }) => css`
  all: unset;
  background-color: ${color[theme].background.primary.default};
  border: 1px solid ${color[theme].border.secondary.default};
  max-width: 50vw;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: auto;
    max-width: 100%;
    height: 50vh;
  }
`;

const overlayOpenStyles = css`
  opacity: 1;
  animation-name: ${drawerIn};

  // On mobile, the drawer should be positioned at the bottom of the screen when closed, and slide up to the top when opened.
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transform: none;
  }
`;

const overlayClosedStyles = css`
  pointer-events: none;
  animation-name: ${drawerOut};

  // On mobile, the drawer should be positioned at the bottom of the screen when closed, and slide up to the top when opened.
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
`;

const getOverlayStyles = ({
  open,
  shouldAnimate,
  zIndex,
  hasToolbar,
  size,
}: {
  open: boolean;
  shouldAnimate: boolean;
  zIndex: number;
  hasToolbar: boolean;
  size: Size;
}) =>
  cx(
    css`
      position: absolute;
      z-index: ${zIndex};
      top: 0;
      bottom: 0;
      right: 0;
      overflow: visible;

      max-width: ${hasToolbar
        ? getDrawerWidth({ size }).withToolbar
        : getDrawerWidth({ size }).default}px;

      // By default, the drawer is positioned off-screen to the right.
      transform: translate3d(100%, 0, 0);
      animation-timing-function: ${TRANSITION_TIMING_FUNCTION};
      animation-duration: ${TRANSITION_DURATION}ms;
      animation-fill-mode: forwards;

      @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        top: unset;
        left: 0;
        // Since the drawer has position: fixed, we can use normal transitions
        animation: none;
        position: fixed;
        transform: translate3d(0, 100%, 0);
        transition-property: transform, opacity;
        transition-duration: ${TRANSITION_DURATION}ms;
        transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
        transition-delay: 0ms, ${open ? '0ms' : `${TRANSITION_DURATION}ms`};
      }
    `,
    {
      [overlayOpenStyles]: open,
      [overlayClosedStyles]: !open && shouldAnimate, // This ensures that the drawer does not animate closed on initial render
    },
  );

const getDisplayModeStyles = ({
  displayMode,
  open,
  shouldAnimate,
  zIndex,
  hasToolbar,
  size,
}: {
  displayMode: DisplayMode;
  open: boolean;
  shouldAnimate: boolean;
  zIndex: number;
  hasToolbar: boolean;
  size: Size;
}) =>
  cx({
    [getOverlayStyles({ open, shouldAnimate, zIndex, hasToolbar, size })]:
      displayMode === DisplayMode.Overlay,
  });

export const getDrawerStyles = ({
  className,
  displayMode,
  open,
  shouldAnimate,
  theme,
  zIndex,
  hasToolbar = false,
  size,
}: {
  className?: string;
  displayMode: DisplayMode;
  open: boolean;
  shouldAnimate: boolean;
  theme: Theme;
  zIndex: number;
  hasToolbar?: boolean;
  size: Size;
}) =>
  cx(
    getBaseStyles({ theme }),
    getDisplayModeStyles({
      displayMode,
      open,
      shouldAnimate,
      zIndex,
      hasToolbar,
      size,
    }),
    className,
    drawerClassName,
  );

export const getResizerStyles = ({
  resizerClassName,
  hasToolbar = false,
}: {
  resizerClassName?: string;
  hasToolbar?: boolean;
}) =>
  cx(
    css`
      position: absolute;
      left: 0px;
    `,
    {
      [css`
        left: ${EMBEDDED_TOOLBAR_OVERFLOW_PADDING}px; // An embedded drawer with a toolbar needs to be offset to the right to account for the overflow padding.
      `]: hasToolbar,
    },
    resizerClassName,
  );

export const getDrawerShadowStyles = ({
  theme,
  displayMode,
}: {
  theme: Theme;
  displayMode: DisplayMode;
}) =>
  cx(
    css`
      height: 100%;
      background-color: ${color[theme].background.primary.default};
    `,
    {
      [css`
        ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};

        @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          ${addOverflowShadow({ isInside: false, side: Side.Top, theme })};
        }
      `]: displayMode === DisplayMode.Overlay,
    },
  );

const getBaseInnerContainerStyles = ({ theme }: { theme: Theme }) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color[theme].background.primary.default};
  opacity: 0;
  transition-property: opacity;
  transition-duration: ${transitionDuration.faster}ms;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
`;

const getInnerOpenContainerStyles = css`
  transition-property: opacity;
  transition-duration: ${transitionDuration.slowest}ms;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  transition-delay: ${transitionDuration.default}ms;
  opacity: 1;
`;

export const getInnerContainerStyles = ({
  theme,
  open,
}: {
  theme: Theme;
  open: boolean;
}) =>
  cx(getBaseInnerContainerStyles({ theme }), {
    [getInnerOpenContainerStyles]: open,
  });

export const getHeaderStyles = ({ theme }: { theme: Theme }) => css`
  height: ${HEADER_HEIGHT}px;
  padding: ${spacing[400]}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color[theme].border.secondary.default};
  transition-property: box-shadow;
  transition-duration: ${transitionDuration.faster}ms;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
`;

export const titleStyles = css`
  flex-grow: 1;
  font-weight: ${fontWeights.semiBold};
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

const innerChildrenContainerScrollStyles = css`
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

const innerChildrenContainerPaddingStyles = css`
  padding: ${spacing[400]}px;
`;

export const getInnerChildrenContainerStyles = ({
  hasPadding,
  scrollable,
}: {
  hasPadding: boolean;
  scrollable: boolean;
}) =>
  cx({
    [innerChildrenContainerPaddingStyles]: hasPadding,
    [innerChildrenContainerScrollStyles]: scrollable,
  });
