import { Mode } from '../mode';

import { darkModeColors } from './darkModeColors';
import { lightModeColors } from './lightModeColors';

export const color = {
  [Mode.Dark]: darkModeColors,
  [Mode.Light]: lightModeColors,
} as const;
