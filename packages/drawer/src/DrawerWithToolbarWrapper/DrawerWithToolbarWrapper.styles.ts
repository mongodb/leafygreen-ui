import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, breakpoints, Side } from '@leafygreen-ui/tokens';

import { PANEL_WIDTH, TOOLBAR_WIDTH } from '../Drawer/Drawer.constants';
import {
  drawerClassName,
  drawerTransitionDuration,
} from '../Drawer/Drawer.styles';
import { DisplayMode } from '../Drawer/Drawer.types';

const drawerIn = keyframes`
  from {
    // explain why this is 1px
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

  // TODO: make a var for breakpoints
  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    animation-name: ${drawerInMobile};
  }
`;

const closedStyles = css`
  animation-name: ${drawerOut};

  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    animation-name: ${drawerOutMobile};
  }
`;

const getDrawerShadowStyles = ({ theme }: { theme: Theme }) => css`
  ${addOverflowShadow({ isInside: false, side: Side.Left, theme })};
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
    css`
      display: grid;
      grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
      grid-template-areas: 'toolbar2 drawer2';
      grid-area: drawer;
      justify-self: end;
      // TODO: reduce motion?
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
    `,
    {
      [getDrawerShadowStyles({ theme })]:
        displayMode === DisplayMode.Overlay && isDrawerOpen,
      [openStyles]: isDrawerOpen,
      [closedStyles]: !isDrawerOpen && shouldAnimate,
    },
    className,
  );
