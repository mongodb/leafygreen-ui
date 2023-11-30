import { HighlightBehavior } from '../Dropdown/Dropdown.types';

export interface HighlightProvider {
  highlightedElement?: HTMLElement | null;
  setHighlightedElement?: (ref: HTMLElement | null) => void;
  highlightBehavior?: HighlightBehavior;
}
