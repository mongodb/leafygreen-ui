import { ComponentProps, RefObject } from 'react';

/** */
export interface Descendant<E extends HTMLElement = HTMLElement> {
  element: E; // Could also be a RefObject
  ref: RefObject<E>;
  id: string;
  index: number;
  props?: ComponentProps<any>;
}

export type DescendantsList<E extends HTMLElement = HTMLElement> = Array<
  Descendant<E>
>;
