import { css, cx } from '@leafygreen-ui/emotion';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  DRAWER_TOOLBAR_WIDTH,
  GRID_AREA,
  MOBILE_BREAKPOINT,
  TRANSITION_DURATION,
  TRANSITION_TIMING_FUNCTION,
} from '../../constants';
import { Size } from '../../Drawer/Drawer.types';
import { getDrawerWidth } from '../../Drawer/Drawer.utils';

const baseStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: auto 0;
  grid-template-areas: '${GRID_AREA.content} ${GRID_AREA.drawer}';
  transition-property: grid-template-columns, grid-template-rows;
  transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
  transition-duration: ${TRANSITION_DURATION}ms;
  overflow: hidden;
  position: relative;
  height: 100%;
`;

const setDrawerDefaultWidth = ({
  isDrawerOpen,
  hasToolbar,
  size,
}: {
  isDrawerOpen?: boolean;
  hasToolbar: boolean;
  size: Size;
}) => css`
  --drawer-width-default: ${isDrawerOpen
    ? hasToolbar
      ? getDrawerWidth({ size }).withToolbar
      : getDrawerWidth({ size }).default
    : 0};
  --drawer-width: var(--drawer-width-default);
`;

const getBaseStyles = ({
  isDrawerOpen,
  hasToolbar,
  size,
}: {
  isDrawerOpen?: boolean;
  hasToolbar: boolean;
  size: Size;
}) => cx(baseStyles, setDrawerDefaultWidth({ isDrawerOpen, hasToolbar, size }));

// If there is no toolbar and the drawer is open, we need to shift the layout by the drawer width;
const getWithoutToolbarBaseStyles = ({
  hasDrawerProp,
}: {
  hasDrawerProp: boolean;
}) =>
  cx(
    css`
      grid-template-columns: auto min(
          50vw,
          calc(var(--drawer-width, var(--drawer-width-default)) * 1px)
        );
    `,
    {
      [css`
        @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          grid-template-columns: auto 0;
        }
      `]: hasDrawerProp,
      [css`
        @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
          grid-template-columns: unset;
          grid-template-rows: 100% 0;
          grid-template-areas: unset;
        }
      `]: !hasDrawerProp,
    },
  );

const getWithoutToolbarOpenStyles = ({
  hasDrawerProp,
}: {
  hasDrawerProp: boolean;
}) =>
  cx({
    [css`
      @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        grid-template-columns: auto 0;
      }
    `]: hasDrawerProp,
    [css`
      @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
        grid-template-rows: 50% 50%;
      }
    `]: !hasDrawerProp,
  });

// If there is a toolbar and the drawer is open, we need to shift the layout by toolbar width + drawer width;
const withToolbarBaseStyles = css`
  grid-template-areas: '${GRID_AREA.content} ${GRID_AREA.drawer}';
  grid-template-columns: auto min(
      50vw,
      calc(
        ${DRAWER_TOOLBAR_WIDTH}px +
          var(--drawer-width, var(--drawer-width-default)) * 1px
      )
    );
`;

const withToolbarOpenStyles = css`
  @media only screen and (max-width: ${breakpoints.Tablet}px) {
    grid-template-columns: auto ${DRAWER_TOOLBAR_WIDTH}px;
  }
`;

const resizingStyles = css`
  transition: none;
`;

export const getEmbeddedDrawerLayoutStyles = ({
  className,
  isDrawerOpen,
  hasToolbar = false,
  isDrawerResizing = false,
  size = Size.Default,
  hasDrawerProp = true,
}: {
  className?: string;
  isDrawerOpen?: boolean;
  hasToolbar?: boolean;
  isDrawerResizing?: boolean;
  size?: Size;
  hasDrawerProp?: boolean;
}) =>
  cx(
    getBaseStyles({ isDrawerOpen, hasToolbar, size }),
    {
      [resizingStyles]: isDrawerResizing,
      [withToolbarBaseStyles]: hasToolbar,
      [withToolbarOpenStyles]: isDrawerOpen && hasToolbar,
      [getWithoutToolbarBaseStyles({ hasDrawerProp })]: !hasToolbar,
      [getWithoutToolbarOpenStyles({ hasDrawerProp })]:
        isDrawerOpen && !hasToolbar,
    },
    className,
  );
