import { Mode } from '../mode';

import { ModeColorRecord } from './color.types';
import { darkModeColors } from './darkModeColors';
import { lightModeColors } from './lightModeColors';

export const color = {
  [Mode.Dark]: darkModeColors,
  [Mode.Light]: lightModeColors,
} as const satisfies Record<Mode, ModeColorRecord>;
