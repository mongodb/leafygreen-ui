import { borderRadius, transitionDuration } from '@leafygreen-ui/tokens';

import { TooltipVariant } from './Tooltip.types';

export const TOOLTIP_MAX_WIDTH = 256;
const NOTCH_HEIGHT = 8;
export const NOTCH_WIDTH = 26;
export const CONTAINER_SIZE = NOTCH_WIDTH;
export const NOTCH_OVERLAP = -(CONTAINER_SIZE - NOTCH_HEIGHT) / 2;
export const borderRadiuses = {
  [TooltipVariant.Default]: borderRadius[400],
  [TooltipVariant.Compact]: borderRadius[150],
};

export const DEFAULT_HOVER_DELAY = transitionDuration.slowest;
export const CALLBACK_DEBOUNCE = 35; // ms
