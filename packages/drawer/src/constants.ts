import { transitionDuration } from '@leafygreen-ui/tokens';
import { TOOLBAR_WIDTH } from '@leafygreen-ui/toolbar';

import { Size } from './Drawer/Drawer.types';

export const GRID_AREA = {
  drawer: 'drawer',
  content: 'content',
  toolbar: 'toolbar',
  innerDrawer: 'inner-drawer',
};

export const DRAWER_WIDTH: Record<Size, number> = {
  [Size.Default]: 432,
  [Size.Large]: 520,
};

export const DRAWER_TOOLBAR_WIDTH = TOOLBAR_WIDTH;
export const TRANSITION_TIMING_FUNCTION = 'ease-in-out';
export const TRANSITION_DURATION = transitionDuration.slower;
export const EMBEDDED_TOOLBAR_OVERFLOW_PADDING = 4;
