import { createContext } from 'react';
import {
  ComboboxSize,
  SearchState,
  State,
  Theme,
  TrunctationLocation,
} from './Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: ComboboxSize;
  withIcons: boolean;
  disabled: boolean;
  isOpen: boolean;
  state: State;
  searchState: SearchState;
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
  state: State.none,
  searchState: SearchState.unset,
});

export const useDarkMode = (darkMode: boolean) =>
  darkMode ? Theme.Dark : Theme.Light;
