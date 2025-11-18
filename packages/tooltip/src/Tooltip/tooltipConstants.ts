import { borderRadius, transitionDuration } from '@leafygreen-ui/tokens';

import { TooltipVariant } from './Tooltip.types';

export const notchHeight = 8;
export const notchWidth = 26;
export const borderRadiuses = {
  [TooltipVariant.Default]: borderRadius[400],
  [TooltipVariant.Compact]: borderRadius[150],
};

export const DEFAULT_HOVER_DELAY = transitionDuration.slowest;
export const CALLBACK_DEBOUNCE = 35; // ms
