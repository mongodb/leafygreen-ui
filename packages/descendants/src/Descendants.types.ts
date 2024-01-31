/** */
export interface Descendant<E extends HTMLElement = HTMLElement> {
  index: number;
  element: E; // Could also be a RefObject
  id: string;
}

// /** TODO: improve this data structure */
export type DescendantsList<E extends HTMLElement = HTMLElement> = Array<
  Descendant<E>
>;
