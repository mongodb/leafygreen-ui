import { createContext } from 'react';
import { ComboboxSize, Theme, TrunctationLocation } from './Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: ComboboxSize;
  withIcons: boolean;
  disabled: boolean;
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
});

export const useDarkMode = (darkMode: boolean) =>
  darkMode ? Theme.Dark : Theme.Light;
