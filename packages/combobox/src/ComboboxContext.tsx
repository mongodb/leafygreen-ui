import { createContext } from 'react';

interface SingleSelectData {
  multiselect?: false;
  selected?: string;
}

interface MultiSelectData {
  multiselect: true;
  selected: Array<string>;
}

type VariableSelectData = SingleSelectData | MultiSelectData;

type ComboboxData = {
  focusedOption?: string;
  // options: Array<string>,
  // displayedOptions: Array<string>
} & VariableSelectData;

export const ComboboxContext = createContext<ComboboxData>({
  multiselect: false,
});
