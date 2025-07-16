import { transparentize } from 'polished';

import { palette } from '@leafygreen-ui/palette';

export const DEFAULT_WIDTH_ANIMATION_DURATION = 500;
export const WIDTH_ANIMATION_SPEED = 3;
export const SHIMMER_ANIMATION_DURATION_MS = 3000;
export const INDETERMINATE_ANIMATION_DURATION_MS = 1500;
export const TRANSITION_ANIMATION_DURATION = 500;
export const TEXT_ANIMATION_DURATION = 250;

/**
 * Widths for animated segments in indeterminate progress bars,
 * used to control the bar's size at keyframes.
 */
export const indeterminateBarWidths = {
  narrow: '33%',
  wide: '66%',
};

/**
 * Positions for the indeterminate bar's left offset at keyframes
 * for smooth horizontal movement in the animation cycle.
 */
export const indeterminateBarPositions = {
  start: '-33%',
  quarter: '0%',
  half: '17%',
  threeQuarters: '67%',
  end: '100%',
};

export const getDeterminateAnimatedGradient = (selectedColorStyle: {
  bar: any;
  shimmerFade: any;
}) => `linear-gradient(
          90deg,
          ${selectedColorStyle.bar} 0%,
          ${selectedColorStyle.shimmerFade} 50%,
          ${selectedColorStyle.bar} 100%
        );`;

export const getIndeterminateGradient = (selectedColorStyle: {
  bar: any;
}) => `linear-gradient(
        90deg,
        ${palette.transparent} 0%,
        ${transparentize(0.25, selectedColorStyle.bar)} 25%,
        ${transparentize(0, selectedColorStyle.bar)} 50%,
        ${transparentize(0.25, selectedColorStyle.bar)} 75%,
        ${palette.transparent} 100%
      );`;
