import { Theme } from '@leafygreen-ui/lib';

import { ThemeColorRecord } from './color.types';
import { darkModeColors } from './darkModeColors';
import { lightModeColors } from './lightModeColors';

export const color = {
  [Theme.Dark]: darkModeColors,
  [Theme.Light]: lightModeColors,
} as const satisfies Record<Theme, ThemeColorRecord>;
