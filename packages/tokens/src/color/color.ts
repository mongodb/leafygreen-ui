import { Mode } from '../mode';
import { MapVariantsToStates, Type } from './color.types';

import { darkModeColors } from './darkModeColors';
import { lightModeColors } from './lightModeColors';

export const color: Record<Mode, Record<Type, MapVariantsToStates>> = {
  [Mode.Dark]: darkModeColors,
  [Mode.Light]: lightModeColors,
} as const;
