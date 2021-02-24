import { transparentize } from 'polished';
import { uiColors } from '@leafygreen-ui/palette';

const buttonOpacity = 0.76;

const visualDesignPallette = {
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
  Info: 'info',
  Default: 'default',
  Danger: 'danger',
  SecondaryDanger: 'secondaryDanger',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export const colorMap: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Primary]: visualDesignPallette.green5,
    [Variant.Info]: transparentize(buttonOpacity, visualDesignPallette.green3),
    [Variant.Default]: uiColors.gray.light2,
    [Variant.Danger]: visualDesignPallette.orange4,
    [Variant.SecondaryDanger]: transparentize(buttonOpacity, uiColors.red.base),
  },
  [Mode.Dark]: {
    [Variant.Primary]: visualDesignPallette.green5,
    [Variant.Info]: transparentize(buttonOpacity, uiColors.green.base),
    [Variant.Default]: uiColors.gray.base,
    [Variant.Danger]: visualDesignPallette.orange4,
    [Variant.SecondaryDanger]: transparentize(
      buttonOpacity,
      visualDesignPallette.orange4,
    ),
  },
};
