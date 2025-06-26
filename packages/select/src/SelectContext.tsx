import { createContext } from 'react';

import { Size } from './Select/Select.types';
import { getLgIds, GetLgIdsReturnType } from './utils';

interface SelectData {
  size: Size;
  open: boolean;
  disabled: boolean;
  /**
   * LGIDs for select components
   */
  lgIds: GetLgIdsReturnType;
}

export const SelectContext = createContext<SelectData>({
  size: Size.Default,
  open: false,
  disabled: false,
  lgIds: getLgIds(),
});

export default SelectContext;
