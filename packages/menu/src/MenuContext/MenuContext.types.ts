import { FocusEventHandler } from 'react';

import { Theme } from '@leafygreen-ui/lib';

export interface MenuData {
  theme: Theme;
  darkMode: boolean;
  onItemFocus: FocusEventHandler<HTMLElement>;
  highlightIndex?: number;
}
