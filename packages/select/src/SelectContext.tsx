import { createContext } from 'react';

import { Theme } from '@leafygreen-ui/lib';

import { Size } from './types';

interface SelectData {
  theme: Theme;
  size: Size;
  open: boolean;
  disabled: boolean;
}

export const SelectContext = createContext<SelectData>({
  theme: Theme.Light,
  size: Size.Default,
  open: false,
  disabled: false,
});

export default SelectContext;
