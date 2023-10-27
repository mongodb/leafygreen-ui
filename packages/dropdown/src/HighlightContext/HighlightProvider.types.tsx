import { HighlightBehavior } from '../Dropdown/Dropdown.types';

export interface HighlightProvider {
  highlightedRef?: HTMLElement | null;
  setHighlightedRef?: (ref: HTMLElement | null) => void;
  highlightBehavior?: HighlightBehavior;
}
