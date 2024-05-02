import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, Type as ColorType } from '@leafygreen-ui/tokens';

import { AvatarSize } from './Avatar.types';

export const avatarSizeMap = {
  // [AvatarSize.Small]: spacing[400] + spacing[150], // 16 + 6 = 22,
  [AvatarSize.Default]: spacing[400] + spacing[300], // 16 + 12 = 28
  [AvatarSize.Large]: spacing[900], // 36
  [AvatarSize.XLarge]: spacing[1200] + spacing[50], // 42
} as const satisfies Record<AvatarSize, number>;

export const avatarFontSizeMap = {
  // [AvatarSize.Small]: spacing[200], // 6 - Not Recommended
  [AvatarSize.Default]: spacing[300], // 12
  [AvatarSize.Large]: spacing[400], // 16
  [AvatarSize.XLarge]: spacing[600], // 24
} as const satisfies Record<AvatarSize, number>;

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
