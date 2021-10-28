import { createContext } from 'react';

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
  // selected?: Array<string> | string;
  // setSelected?: (id: Array<string> | string) => void;
  // focusedOption?: string;
  // options: Array<string>,
  // displayedOptions: Array<string>
} // & VariableSelectData;

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
});
