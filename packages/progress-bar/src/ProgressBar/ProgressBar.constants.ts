import { transparentize } from 'polished';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { borderRadius } from '@leafygreen-ui/tokens';

import { Color, Size } from './ProgressBar.types';

export const WIDTH_ANIMATION_DURATION = 500;
export const SHIMMER_ANIMATION_DURATION_MS = 3000;
export const INDETERMINATE_ANIMATION_DURATION_MS = 1500;
export const TRANSITION_ANIMATION_DURATION = 500;
export const TEXT_ANIMATION_DURATION = 250;

export const indeterminateBarWidths = {
  narrow: '33%',
  wide: '66%',
};

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

const customFadePalette = {
  blue: '#C3E7FE',
  green: '#C0FAE6',
};

export const barSizeStyles = {
  [Size.Small]: {
    height: '4px',
    borderRadius: borderRadius[100] + 'px',
  },
  [Size.Default]: {
    height: '8px',
    borderRadius: borderRadius[100] + 'px',
  },
  [Size.Large]: {
    height: '16px',
    borderRadius: borderRadius[200] + 'px',
  },
};

export const barColorStyles = {
  [Theme.Light]: {
    track: palette.gray.light2,
    disabledBar: palette.gray.light1,

    [Color.Blue]: {
      bar: palette.blue.base,
      icon: palette.blue.base,
      shimmerFade: transparentize(0.5, customFadePalette.blue),
    },
    [Color.Green]: {
      bar: palette.green.dark1,
      icon: palette.green.dark1,
      shimmerFade: transparentize(0.5, customFadePalette.green),
    },
    [Color.Yellow]: {
      bar: palette.yellow.base,
      icon: palette.yellow.dark2,
    },
    [Color.Red]: {
      bar: palette.red.base,
      icon: palette.red.base,
    },
  },
  [Theme.Dark]: {
    track: palette.gray.dark2,
    disabledBar: palette.gray.dark1,

    [Color.Blue]: {
      bar: palette.blue.light1,
      icon: palette.blue.light1,
      shimmerFade: transparentize(0.25, customFadePalette.blue),
    },
    [Color.Green]: {
      bar: palette.green.base,
      icon: palette.green.base,
      shimmerFade: transparentize(0.25, customFadePalette.green),
    },
    [Color.Yellow]: {
      bar: palette.yellow.base,
      icon: palette.yellow.base,
    },
    [Color.Red]: {
      bar: palette.red.light1,
      icon: palette.red.light1,
    },
  },
};
