import { transparentize } from 'polished';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { borderRadius } from '@leafygreen-ui/tokens';

import { Size, Variant } from '../ProgressBar.types';

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

    [Variant.Info]: {
      bar: palette.blue.base,
      icon: palette.blue.base,
      shimmerFade: transparentize(0.5, customFadePalette.blue),
    },
    [Variant.Success]: {
      bar: palette.green.dark1,
      icon: palette.green.dark1,
      shimmerFade: transparentize(0.5, customFadePalette.green),
    },
    [Variant.Warning]: {
      bar: palette.yellow.base,
      icon: palette.yellow.dark2,
    },
    [Variant.Error]: {
      bar: palette.red.base,
      icon: palette.red.base,
    },
  },
  [Theme.Dark]: {
    track: palette.gray.dark2,
    disabledBar: palette.gray.dark1,

    [Variant.Info]: {
      bar: palette.blue.light1,
      icon: palette.blue.light1,
      shimmerFade: transparentize(0.25, customFadePalette.blue),
    },
    [Variant.Success]: {
      bar: palette.green.base,
      icon: palette.green.base,
      shimmerFade: transparentize(0.25, customFadePalette.green),
    },
    [Variant.Warning]: {
      bar: palette.yellow.base,
      icon: palette.yellow.base,
    },
    [Variant.Error]: {
      bar: palette.red.light1,
      icon: palette.red.light1,
    },
  },
};
