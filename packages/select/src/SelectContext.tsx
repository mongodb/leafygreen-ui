import { createContext } from 'react';
import { Mode, Size } from './styleSets';

interface SelectData {
  mode: Mode;
  size: Size;
  open: boolean;
  disabled: boolean;
}

export const SelectContext = createContext<SelectData>({
  mode: Mode.Light,
  size: Size.Normal,
  open: false,
  disabled: false,
});

export default SelectContext;
