import { createContext, Dispatch } from 'react';

import { DescendantsList } from './Descendants.types';
import { DescendantsReducerAction } from './DescendantsReducer';

export interface DescendantsContextProps<T extends HTMLElement> {
  descendants: DescendantsList<T>;
  dispatch: Dispatch<DescendantsReducerAction<T>>;
}

export type DescendantContextType<T extends HTMLElement> = React.Context<
  DescendantsContextProps<T>
>;

/**
 * A factory function that creates a new Context object.
 * The returned Context object will be used to define which context a descendant is a part of.
 */
export const createDescendantsContext = <T extends HTMLElement = HTMLElement>(
  displayName?: string,
): DescendantContextType<T> => {
  const context = createContext<DescendantsContextProps<T>>({
    descendants: [],
    dispatch: () => {},
  });
  context.displayName = displayName ?? 'DescendantsContext';

  return context;
};
