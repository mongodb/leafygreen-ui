import { createContext } from 'react';
import {
  ComboboxSize,
  FilterType,
  TrunctationLocationType,
} from './Combobox.types';

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: keyof typeof ComboboxSize;
  withIcons: boolean;
  chipTruncationLocation?: TrunctationLocationType;
  chipCharacterLimit?: number;
  filter?: FilterType;
  inputValue?: string;
}

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
  darkMode: false,
  size: 'default',
  withIcons: false,
});
