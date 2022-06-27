import { createContext } from 'react';
import { Mode, Size } from './types';

interface SelectData {
  mode: Mode;
  size: Size;
  open: boolean;
  disabled: boolean;
}

export const SelectContext = createContext<SelectData>({
  mode: Mode.Light,
  size: Size.Default,
  open: false,
  disabled: false,
});

export default SelectContext;
