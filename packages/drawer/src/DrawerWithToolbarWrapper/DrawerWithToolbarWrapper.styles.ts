import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { addOverflowShadow, Side } from '@leafygreen-ui/tokens';

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

const openStyles = css`
  animation-name: ${drawerIn};
  animation-fill-mode: forwards;
`;

const closedStyles = css`
  animation-name: ${drawerOut};
`;

// TODO: mobile
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
      /* position: relative; */
      overflow: hidden;
      justify-self: end;
      // TODO: reduce motion?
      /* animation-timing-function: linear; */
      animation-timing-function: ease-in-out;
      animation-duration: ${drawerTransitionDuration}ms;
      z-index: 0;

      /* position: absolute;
      height: 100%;
      left: 0; */

      .${drawerClassName} {
        position: unset;
        transition: none;
        transform: unset;
        overflow: hidden;
        opacity: 1;
      }
    `,
    {
      [getDrawerShadowStyles({ theme })]: displayMode === DisplayMode.Overlay,
      [openStyles]: isDrawerOpen,
      [closedStyles]: !isDrawerOpen && shouldAnimate,
    },
    // css`
    //   position: absolute;
    // `,
    className,
  );
