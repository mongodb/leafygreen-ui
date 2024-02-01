import { ComponentProps, Reducer } from 'react';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';

import {
  findDescendantIndexWithId,
  findDOMIndex,
  insertDescendantAt,
  removeIndex,
} from './utils/';
import { Descendant, DescendantsList } from './Descendants.types';

export interface DescendantsState<T extends HTMLElement> {
  descendants: DescendantsList<T>;
}

export type DescendantsReducerAction<T extends HTMLElement> =
  | {
      type: 'register';
      id: string;
      ref: React.RefObject<T>;
      props?: ComponentProps<any>;
    }
  | {
      type: 'remove';
      id: string;
    }
  | {
      type: 'update';
      id: string;
      props?: ComponentProps<any>;
    };

export type DescendantsReducerType<T extends HTMLElement> = Reducer<
  DescendantsState<T>,
  DescendantsReducerAction<T>
>;

/**
 *
 * Establishes a state with a `descendants` list, and a `dispatch` function to modify the descendants list
 *
 * @param state
 * @param action
 * @returns
 */
export const descendantsReducer = <T extends HTMLElement>(
  state: DescendantsState<T>,
  action: DescendantsReducerAction<T>,
) => {
  switch (action.type) {
    case 'register': {
      if (!action.ref.current) {
        return state;
      }

      // 1. Check if element is tracked
      const registeredIndex = findDescendantIndexWithId(
        state.descendants,
        action.id,
      );

      const isElementRegistered = registeredIndex >= 0;

      if (!isElementRegistered) {
        // The element is not yet registered

        // If there are no tracked descendants, then this element is at index 0,
        // Otherwise, check the array of tracked elements to find what index this element should be
        const element = action.ref.current;
        const index = findDOMIndex(element, state.descendants);

        const thisDescendant: Descendant<T> = {
          element,
          id: action.id,
          props: action.props,
        };

        // Add the new descendant at the given index
        const newDescendants = insertDescendantAt(
          state.descendants,
          thisDescendant,
          index,
        );

        return {
          descendants: newDescendants,
        };
      }

      return state;
    }

    case 'update': {
      const registeredIndex = findDescendantIndexWithId(
        state.descendants,
        action.id,
      );

      if (registeredIndex >= 0) {
        const descendant = state.descendants[registeredIndex];
        const arePropsEqual = isEqual(descendant.props, action.props);

        // if the props have changed, we update the descendant
        if (!isUndefined(action.props) && !arePropsEqual) {
          descendant.props = action.props;
          return {
            descendants: state.descendants,
          };
        }
      }

      return state;
    }

    case 'remove': {
      /** Remove an element from the tracked list */
      const registeredIndex = findDescendantIndexWithId(
        state.descendants,
        action.id,
      );

      if (registeredIndex >= 0) {
        // If an element exists with the given id, remove it
        const newDescendants = removeIndex(state.descendants, registeredIndex);
        return { descendants: newDescendants };
      }

      // no change
      return state;
    }

    default:
      break;
  }

  return state;
};
