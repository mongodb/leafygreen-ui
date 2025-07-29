import { transitionDuration } from '@leafygreen-ui/tokens';
import { TOOLBAR_WIDTH } from '@leafygreen-ui/toolbar';

export const GRID_AREA = {
  drawer: 'drawer',
  content: 'content',
  toolbar: 'toolbar',
  innerDrawer: 'inner-drawer',
};

export const DRAWER_WIDTH = {
  default: 432,
  large: 472,
};

export const DRAWER_TOOLBAR_WIDTH = TOOLBAR_WIDTH;
export const TRANSITION_TIMING_FUNCTION = 'ease-in-out';
export const TRANSITION_DURATION = transitionDuration.slower;
