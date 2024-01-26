import { createContext } from 'react';

import { DescendantsList } from '../Descendants.types';

export type RegisterDescendantFn<T extends HTMLElement> = (
  element?: T | null,
) => () => void;

export interface DescendantsContextProps<T extends HTMLElement> {
  descendants: DescendantsList<T>;
  registerDescendant: RegisterDescendantFn<T>;
}

export type DescendantContextType<T extends HTMLElement> = React.Context<
  DescendantsContextProps<T>
>;

/**
 * A factory function that creates a new Context object.
 * The returned Context object will be used to define which context a descendant is a part of.
 */
export const createDescendantsContext = <T extends HTMLElement = HTMLElement>(
  displayName: string,
): DescendantContextType<T> => {
  const context = createContext<DescendantsContextProps<T>>({
    descendants: [],
    registerDescendant: () => () => {},
  });
  context.displayName = displayName;

  return context;
};
