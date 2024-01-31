import { findDescendantIndexWithId } from './utils/findDescendantWithId';
import { findDOMIndex } from './utils/findDOMIndex';
import { insertAt } from './utils/insertAt';
import { removeIndex } from './utils/removeIndex';
import { Descendant, DescendantsList } from './Descendants.types';

export interface DescendantsState<T extends HTMLElement> {
  descendants: DescendantsList<T>;
}

export type DescendantsReducerAction<T extends HTMLElement> =
  | {
      type: 'register';
      id: string;
      currentIndex: number;
      ref: React.RefObject<T>;
      callback?: (d: Descendant<T>) => void;
    }
  | {
      type: 'remove';
      id: string;
    };

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
      const trackedIndex = findDescendantIndexWithId(
        state.descendants,
        action.id,
      );

      const isElementTracked = trackedIndex >= 0;
      const _name = action.ref.current.innerHTML;

      if (isElementTracked) {
        if (action.currentIndex === -1) {
          return state;
        }

        // Check that the indexes are correct
        const doIndexesMatch = trackedIndex === action.currentIndex;

        if (!doIndexesMatch) {
          // TODO: Move element to correct index
          // eslint-disable-next-line no-console
          console.log(
            `Element ${_name} is tracked at index ${trackedIndex}, and internal index ${action.currentIndex}`,
          );
        }

        // no change
        return state;
      } else {
        // The element is not yet tracked

        // If there are no tracked descendants, then this element is at index 0,
        // Otherwise, check the array of tracked elements to find what index this element should be
        const element = action.ref.current;
        const index = findDOMIndex(element, state.descendants);

        const thisDescendant: Descendant<T> = {
          element,
          id: action.id,
          index,
        };

        // Add the new descendant at the given index
        const newDescendants = insertAt(
          state.descendants,
          thisDescendant,
          index,
        );

        // Run any side effects
        action.callback?.(thisDescendant);

        return {
          descendants: newDescendants,
        };
      }
    }

    case 'remove': {
      /** Remove an element from the tracked list */
      const trackedIndex = findDescendantIndexWithId(
        state.descendants,
        action.id,
      );

      if (trackedIndex >= 0) {
        // If an element exists with the given id, remove it
        const newDescendants = removeIndex(state.descendants, trackedIndex);
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
