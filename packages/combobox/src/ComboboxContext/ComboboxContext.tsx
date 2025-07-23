import { createContext } from 'react';

import {
  ComboboxSize,
  Overflow,
  SearchState,
  State,
  TruncationLocation,
} from '../types';

export interface ComboboxData {
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
  popoverZIndex?: number;
}

export const defaultContext = {
  multiselect: false,
  size: ComboboxSize.Default,
  withIcons: false,
  disabled: false,
  isOpen: false,
  state: State.None,
  searchState: SearchState.Unset,
  overflow: Overflow.expandY,
};

export const ComboboxContext = createContext<ComboboxData>(defaultContext);
