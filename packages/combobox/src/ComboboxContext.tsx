import { createContext } from 'react';
import { ComboboxSize, TrunctationLocation } from './Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: ComboboxSize;
  withIcons: boolean;
  disabled: boolean;
  isOpen: boolean;
  chipTruncationLocation?: TrunctationLocation;
  chipCharacterLimit?: number;
  inputValue?: string;
}

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
  darkMode: false,
  size: ComboboxSize.Default,
  withIcons: false,
  disabled: false,
  isOpen: false,
});
