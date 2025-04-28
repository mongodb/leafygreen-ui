import { css, cx, keyframes } from '@leafygreen-ui/emotion';

import { PANEL_WIDTH, TOOLBAR_WIDTH } from '../Drawer/Drawer.constants';
import {
  drawerClassName,
  drawerTransitionDuration,
} from '../Drawer/Drawer.styles';

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

export const getDrawerWithToolbarWrapperStyles = ({
  className,
  isDrawerOpen,
  shouldAnimate,
}: {
  className?: string;
  isDrawerOpen: boolean;
  shouldAnimate?: boolean;
}) =>
  cx(
    css`
      display: grid;
      grid-template-columns: ${TOOLBAR_WIDTH}px 0px;
      grid-template-areas: 'toolbar2 drawer2';
      grid-area: drawer;
      position: relative;
      overflow: hidden;
      justify-self: end;
      // TODO: reduce motion?
      /* animation-timing-function: linear; */
      animation-timing-function: ease-in-out;
      animation-duration: ${drawerTransitionDuration}ms;

      .${drawerClassName} {
        position: unset;
        transition: none;
        transform: unset;
        overflow: hidden;
        opacity: 1;
      }
    `,
    {
      [openStyles]: isDrawerOpen,
      [closedStyles]: !isDrawerOpen && shouldAnimate,
    },
    className,
  );
