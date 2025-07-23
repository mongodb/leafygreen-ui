import { ComponentProps, Reducer } from 'react';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';

import {
  findDescendantIndexWithId,
  findDOMIndex,
  insertDescendantAt,
  refreshDescendantIndexes,
  removeIndex,
} from './utils/';
import { Descendant, DescendantsList } from './Descendants.types';

export type DescendantsState<T extends HTMLElement> = DescendantsList<T>;

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
      // TODO: index
    };

export type DescendantsReducerType<T extends HTMLElement> = Reducer<
  DescendantsState<T>,
  DescendantsReducerAction<T>
>;

/**
 * A function matching the React.Reducer signature,
 * that accepts a `DescendantsList` as current state,
 * and custom `action` object to modify the descendants list.
 *
 * @param currentState {@link DescendantsState} The current reducer state
 * @param action {@link DescendantsReducerAction} The reducer action type
 * @returns A modified {@link DescendantsState} object
 */
export const descendantsReducer = <T extends HTMLElement>(
  currentState: DescendantsState<T>,
  action: DescendantsReducerAction<T>,
): DescendantsState<T> => {
  switch (action.type) {
    case 'register': {
      if (!action.ref.current) {
        return currentState;
      }

      // 1. Check if element is tracked
      const registeredIndex = findDescendantIndexWithId(
        currentState,
        action.id,
      );

      const isElementRegistered = registeredIndex >= 0;

      if (!isElementRegistered) {
        // The element is not yet registered

        // 2. If there are no tracked descendants, then this element is at index 0,
        // Otherwise, check the array of tracked elements to find what index this element should be
        const element = action.ref.current;
        const index = findDOMIndex(element, currentState);

        const thisDescendant: Descendant<T> = {
          ref: action.ref,
          element,
          id: action.id,
          props: action.props,
          index,
        };

        // 3. Add the new descendant at the given index
        const newDescendants = insertDescendantAt(
          currentState,
          thisDescendant,
          index,
        );

        const indexedDescendants = refreshDescendantIndexes(newDescendants);
        return indexedDescendants;
      }

      return currentState;
    }

    case 'update': {
      const registeredIndex = findDescendantIndexWithId(
        currentState,
        action.id,
      );

      if (registeredIndex >= 0) {
        const descendant = currentState[registeredIndex];
        const arePropsEqual = isEqual(descendant.props, action.props);

        // if the props have changed, we update the descendant
        if (!isUndefined(action.props) && !arePropsEqual) {
          descendant.props = action.props;
          return currentState;
        }
      }

      return currentState;
    }

    case 'remove': {
      /** Remove an element from the tracked list */
      const registeredIndex = findDescendantIndexWithId(
        currentState,
        action.id,
      );

      if (registeredIndex >= 0) {
        // If an element exists with the given id, remove it
        const newDescendants = removeIndex(currentState, registeredIndex);
        const indexedDescendants = refreshDescendantIndexes(newDescendants);

        return indexedDescendants;
      }

      // no change
      return currentState;
    }

    default:
      break;
  }

  return currentState;
};
