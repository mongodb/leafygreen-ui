import { transitionDuration } from '@leafygreen-ui/tokens';

export const checkBoxSize = 14;
export const checkAnimationDuration = transitionDuration.faster;
export const hypotenusePct = 100 * Math.sqrt(2); // relative distance from corner to corner
export const insetPct = 100 - hypotenusePct;
export const rippleScale = 2.25;
export const rippleTransitionScale = 4;
export const rippleTransitionDelay = -rippleTransitionScale / rippleScale;

const LGID_ROOT = 'lg-checkbox';

export const LGIDS_CHECKBOX = {
  root: LGID_ROOT,
} as const;
