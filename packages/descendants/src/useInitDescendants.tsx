import { Dispatch, useReducer } from 'react';

import { DescendantsList } from './Descendants.types';
import {
  descendantsReducer,
  DescendantsReducerAction,
  DescendantsReducerType,
  DescendantsState,
} from './DescendantsReducer';

export interface InitDescendantsReturnObject<T extends HTMLElement> {
  descendants: DescendantsList<T>;
  dispatch: Dispatch<DescendantsReducerAction<T>>;
}

/**
 * Initializes a {@link DescendantsList}
 */
export const useInitDescendants = <
  T extends HTMLElement,
>(): InitDescendantsReturnObject<T> => {
  const [state, dispatch] = useReducer<
    React.Reducer<DescendantsState<T>, DescendantsReducerAction<T>>
  >(descendantsReducer as DescendantsReducerType<T>, {
    descendants: [] as DescendantsList<T>,
  });

  return {
    descendants: state.descendants,
    dispatch,
  };
};
