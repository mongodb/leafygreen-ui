/** */
export interface Descendant<E extends HTMLElement = HTMLElement> {
  element: E; // Could also be a RefObject
  id: string;
}

export type DescendantsList<E extends HTMLElement = HTMLElement> = Array<
  Descendant<E>
>;
