import { Color } from './ProgressBar/ProgressBar.types';

export const WIDTH_ANIMATION_DURATION = 500;
export const SHIMMER_ANIMATION_DURATION_MS = 3000;
export const INDETERMINATE_ANIMATION_DURATION_MS = 1500;
export const TRANSITION_ANIMATION_DURATION = 500;

export const INDETERMINATE_BAR_WIDTHS = {
  narrow: '33%',
  wide: '66%',
};

export const INDETERMINATE_BAR_POSITIONS = {
  start: '-33%',
  quarter: '0%',
  half: '17%',
  threeQuarters: '67%',
  end: '100%',
};

export const DEFAULT_MAX_VALUE = 1;
export const DEFAULT_COLOR = Color.Blue;

export const ICONS_PENDING_COMPLETION: Array<Color> = [Color.Green];
