import { transitionDuration } from '@leafygreen-ui/tokens';

export const gridAreas = {
  sideNav: 'side-nav',
  main: 'main',
} as const;

export const COLLAPSED_SIDE_NAV_WIDTH = 48;
export const COLLAPSED_SIDE_NAV_WIDTH_WITH_BORDER =
  COLLAPSED_SIDE_NAV_WIDTH + 1;
export const PINNED_SIDE_NAV_WIDTH = 256;
export const PINNED_SIDE_NAV_WIDTH_WITH_BORDER = PINNED_SIDE_NAV_WIDTH + 1;
export const SIDE_NAV_TRANSITION_DURATION = transitionDuration.slower;
