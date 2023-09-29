import { createContext } from 'react';

import { Size } from './Select/Select.types';

interface SelectData {
  size: Size;
  open: boolean;
  disabled: boolean;
}

export const SelectContext = createContext<SelectData>({
  size: Size.Default,
  open: false,
  disabled: false,
});

export default SelectContext;
