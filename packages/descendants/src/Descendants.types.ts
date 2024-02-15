import { ComponentProps } from 'react';

/** */
export interface Descendant<E extends HTMLElement = HTMLElement> {
  element: E; // Could also be a RefObject
  id: string;
  index: number;
  props?: ComponentProps<any>;
}

export type DescendantsList<E extends HTMLElement = HTMLElement> = Array<
  Descendant<E>
>;
