import { createContext } from 'react';
import { ComboboxSize } from './Combobox.types';

// interface SingleSelectData {
//   multiselect?: false;
//   selected?: string;
//   setSelected?: (id: string) => void
// }

// interface MultiSelectData {
//   multiselect: true;
//   selected?: Array<string>;
//   setSelected?: (id: Array<string>) => void
// }

// type VariableSelectData = SingleSelectData | MultiSelectData;

interface ComboboxData {
  multiselect: boolean;
  darkMode: boolean;
  size: keyof typeof ComboboxSize;
  withIcons: boolean;
  // selected?: Array<string> | string;
  // setSelected?: (id: Array<string> | string) => void;
  // focusedOption?: string;
  // options: Array<string>,
  // displayedOptions: Array<string>
} // & VariableSelectData;

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
  darkMode: false,
  size: 'default',
  withIcons: false,
});
