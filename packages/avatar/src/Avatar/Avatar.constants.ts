import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { Size, spacing, Type as ColorType } from '@leafygreen-ui/tokens';

export const avatarSizeMap = {
  [Size.XSmall]: spacing[400],
  [Size.Small]: spacing[400] + spacing[300],
  [Size.Default]: spacing[900],
  [Size.Large]: spacing[1200],
} as const satisfies Record<Size, number>;

export const avatarColors = {
  [Theme.Light]: {
    [ColorType.Background]: palette.gray.base,
    [ColorType.Icon]: palette.white,
    [ColorType.Text]: palette.white,
    [ColorType.Border]: palette.gray.light3,
  },
  [Theme.Dark]: {
    [ColorType.Background]: palette.gray.base,
    [ColorType.Icon]: palette.white,
    [ColorType.Text]: palette.white,
    [ColorType.Border]: palette.gray.dark4,
  },
} as const satisfies Record<Theme, Record<ColorType, string>>;
