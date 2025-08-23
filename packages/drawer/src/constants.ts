import { breakpoints, transitionDuration } from '@leafygreen-ui/tokens';
import { TOOLBAR_WIDTH } from '@leafygreen-ui/toolbar';

import { Size } from './Drawer/Drawer.types';

export const GRID_AREA = {
  drawer: 'drawer',
  content: 'content',
  toolbar: 'toolbar',
  innerDrawer: 'inner-drawer',
};

type DrawerWidths = Record<Size, number>;
export const DRAWER_WIDTHS = {
  [Size.Default]: 432,
  [Size.Large]: 520,
} as const satisfies DrawerWidths;

export const DRAWER_TOOLBAR_WIDTH = TOOLBAR_WIDTH;
export const TRANSITION_TIMING_FUNCTION = 'ease-in-out';
export const TRANSITION_DURATION = transitionDuration.slower;
export const EMBEDDED_TOOLBAR_OVERFLOW_PADDING = 4;

export const HEADER_HEIGHT = 48;
export const MOBILE_BREAKPOINT = breakpoints.Tablet;
export const DRAWER_MAX_WIDTH = 612;
export const DRAWER_MAX_WIDTH_WITH_TOOLBAR =
  DRAWER_MAX_WIDTH - DRAWER_TOOLBAR_WIDTH;
export const DRAWER_MIN_WIDTH = 320;
export const DRAWER_MIN_WIDTH_WITH_TOOLBAR =
  DRAWER_MIN_WIDTH - DRAWER_TOOLBAR_WIDTH;
