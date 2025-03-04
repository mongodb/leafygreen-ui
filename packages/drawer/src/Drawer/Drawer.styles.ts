import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

import {
  HEADER_HEIGHT,
  MOBILE_BREAKPOINT,
  PANEL_WIDTH,
} from './Drawer.constants';
import { DisplayMode } from './Drawer.types';

const drawerTransitionDuration = transitionDuration.slower;

const getBaseStyles = ({ theme }: { theme: Theme }) => css`
  background-color: ${color[theme].background.primary.default};
  border: 1px solid ${color[theme].border.secondary.default};
  width: 100%;
  max-width: ${PANEL_WIDTH}px;
  height: 100%;
  overflow: auto;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    max-width: 100%;
    height: 50vh;
  }
`;

const getOverlayOpenStyles = (theme: Theme) => css`
  box-shadow: ${theme === Theme.Light
    ? `-10px 0 10px -10px rgba(0, 0, 0, 0.3)`
    : 'initial'};
  opacity: 1;
  transform: translateX(0);

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    box-shadow: ${theme === Theme.Light
      ? `0 -10px 10px -10px rgba(0, 0, 0, 0.3)`
      : 'initial'};
    transform: translateY(0);
  }
`;

const overlayClosedStyles = css`
  box-shadow: 'initial';
  opacity: 0;
  transform: translateX(100%);
  pointer-events: none;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    box-shadow: 'initial';
    transform: translateY(100%);
  }
`;

const getOverlayStyles = ({ open, theme }: { open: boolean; theme: Theme }) =>
  cx(
    css`
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      transition: transform ${drawerTransitionDuration}ms ease-in-out,
        box-shadow ${drawerTransitionDuration}ms ease-in-out
          ${open ? '0ms' : `${drawerTransitionDuration}ms`},
        opacity ${drawerTransitionDuration}ms ease-in-out
          ${open ? '0ms' : `${drawerTransitionDuration}ms`};

      @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        top: unset;
        left: 0;
      }
    `,
    {
      [getOverlayOpenStyles(theme)]: open,
      [overlayClosedStyles]: !open,
    },
  );

const persistentOpenStyles = css`
  width: 100%;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    height: 50vh;
  }
`;

const persistentClosedStyles = css`
  width: 0;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    height: 0;
  }
`;

const getPersistentStyles = ({ open }: { open: boolean }) =>
  cx(
    css`
      position: relative;
    `,
    {
      [persistentOpenStyles]: open,
      [persistentClosedStyles]: !open,
    },
  );

const getDisplayModeStyles = ({
  displayMode,
  open,
  theme,
}: {
  displayMode: DisplayMode;
  open: boolean;
  theme: Theme;
}) =>
  cx({
    [getOverlayStyles({ open, theme })]: displayMode === DisplayMode.Overlay,
    [getPersistentStyles({ open })]: displayMode === DisplayMode.Persistent,
  });

export const getDrawerStyles = ({
  className,
  displayMode,
  open,
  theme,
}: {
  className?: string;
  displayMode: DisplayMode;
  open: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseStyles({ theme }),
    getDisplayModeStyles({ displayMode, open, theme }),
    className,
  );

const getBaseHeaderStyles = ({
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

export const getShadowTopStyles = ({ theme }: { theme: Theme }) => css`
  box-shadow: ${theme === Theme.Light
    ? `0px 10px 20px -10px ${transparentize(0.8, palette.black)}`
    : '0px 6px 30px -10px rgba(0, 0, 0, 0.5)'};
`;

export const getHeaderStyles = ({
  hasShadowTop,
  hasTabs,
  theme,
}: {
  hasShadowTop: boolean;
  hasTabs: boolean;
  theme: Theme;
}) =>
  cx(getBaseHeaderStyles({ hasTabs, theme }), {
    [getShadowTopStyles({ theme })]: hasShadowTop,
  });

const baseChildrenContainerStyles = css`
  height: calc(100% - ${HEADER_HEIGHT}px);
`;

export const scrollContainerStyles = css`
  padding: ${spacing[400]}px;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const getChildrenContainerStyles = ({ hasTabs }: { hasTabs: boolean }) =>
  cx(baseChildrenContainerStyles, { [scrollContainerStyles]: !hasTabs });
