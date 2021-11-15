import { createContext } from 'react';
import { ComboboxSize, TrunctationLocation } from './Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: keyof typeof ComboboxSize;
  withIcons: boolean;
  chipTruncationLocation?: TrunctationLocation;
  chipCharacterLimit?: number;
  inputValue?: string;
}

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
  darkMode: false,
  size: 'default',
  withIcons: false,
});
