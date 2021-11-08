import { createContext } from 'react';
import { ComboboxSize, TrunctationLocationType } from './Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: keyof typeof ComboboxSize;
  withIcons: boolean;
  chipTruncationLocation?: TrunctationLocationType;
  chipCharacterLimit?: number;
}

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
  darkMode: false,
  size: 'default',
  withIcons: false,
});
