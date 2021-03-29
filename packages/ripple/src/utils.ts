import { transparentize } from 'polished';
import { uiColors } from '@leafygreen-ui/palette';

const buttonOpacity = 0.76;

const visualDesignPalette = {
  green5: '#0AD05B',
  green3: '#09804C',
  orange4: '#F97216',
};

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export { Mode };

const Variant = {
  Primary: 'primary',
  PrimaryOutline: 'primaryOutline',
  Default: 'default',
  Danger: 'danger',
  DangerOutline: 'dangerOutline',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export interface Options {
  backgroundColor: string;
}

export const colorMap: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: visualDesignPalette.green5,
    [Variant.PrimaryOutline]: transparentize(
      buttonOpacity,
      visualDesignPalette.green3,
    ),
    [Variant.Default]: uiColors.gray.light2,
    [Variant.Danger]: visualDesignPalette.orange4,
    [Variant.DangerOutline]: transparentize(buttonOpacity, uiColors.red.base),
  },
  [Mode.Dark]: {
    [Variant.Primary]: visualDesignPalette.green5,
    [Variant.PrimaryOutline]: transparentize(
      buttonOpacity,
      uiColors.green.base,
    ),
    [Variant.Default]: uiColors.gray.base,
    [Variant.Danger]: visualDesignPalette.orange4,
    [Variant.DangerOutline]: transparentize(
      buttonOpacity,
      visualDesignPalette.orange4,
    ),
  },
};
