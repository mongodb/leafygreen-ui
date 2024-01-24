/** */
export interface Descendant<E extends HTMLElement> {
  index: number;
  element: E; // Could also be a RefObject
}
