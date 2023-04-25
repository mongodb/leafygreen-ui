import { createContext } from 'react';

import {
  ComboboxSize,
  Overflow,
  SearchState,
  State,
  TruncationLocation,
} from '../Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  size: ComboboxSize;
  withIcons: boolean;
  disabled: boolean;
  isOpen: boolean;
  state: State;
  searchState: SearchState;
  overflow: Overflow;
  chipTruncationLocation?: TruncationLocation;
  chipCharacterLimit?: number;
  inputValue?: string;
}

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
  size: ComboboxSize.Default,
  withIcons: false,
  disabled: false,
  isOpen: false,
  state: State.none,
  searchState: SearchState.unset,
  overflow: Overflow.expandY,
});
