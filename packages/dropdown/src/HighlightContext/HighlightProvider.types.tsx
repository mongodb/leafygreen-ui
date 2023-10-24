import { CheckedVariant } from '@leafygreen-ui/input-option';

import { HighlightBehavior } from '../Dropdown/Dropdown.types';

export interface HighlightProvider {
  highlightedRef?: HTMLElement | null;
  setHighlightedRef?: (ref: HTMLElement | null) => void;
  highlightBehavior?: HighlightBehavior;
  checkedVariant?: CheckedVariant;
}
