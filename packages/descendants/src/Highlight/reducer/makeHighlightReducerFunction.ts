import {
  Descendant,
  DescendantsList,
  getDescendantById,
  getDescendantByIndex,
} from '../../Descendants';
import { getDeltaFromDirection } from '../utils/getDeltaFromDirection';
import { getRelativeDescendant } from '../utils/getRelativeDescendant';

import { HighlightReducerFunction } from './reducer.types';

interface ReducerFunctionOptions<T extends HTMLElement> {
  filter?: (d: Descendant<T>) => boolean;
}

/**
 * Creates a new reducer function for closure for a given `descendants` value
 */
export const makeHighlightReducerFunction = <T extends HTMLElement>(
  getDescendants: () => DescendantsList<T>,
  options?: ReducerFunctionOptions<T>,
): HighlightReducerFunction<T> => {
  return (currentHighlight, action) => {
    const descendants = getDescendants();

    if (!currentHighlight) return currentHighlight;

    // Move the highlight relative to the current highlight
    if (
      typeof action.direction === 'string' ||
      typeof action.delta === 'number'
    ) {
      const delta = action.delta ?? getDeltaFromDirection(action.direction);
      const nextHighlight = getRelativeDescendant(
        delta,
        currentHighlight,
        descendants,
        options?.filter,
      );
      return nextHighlight; // getRelativeDescendant returns a `filter`ed value

      // if we've received an explicit index, set the highlight
    } else if (typeof action.index === 'number') {
      const nextHighlight = getDescendantByIndex(action.index, descendants);
      return filteredResult(nextHighlight, currentHighlight, options?.filter);
      // If we've received an explicit id, set the highlight
    } else if (typeof action.id === 'string') {
      const nextHighlight = getDescendantById(action.id, descendants);
      return filteredResult(nextHighlight, currentHighlight, options?.filter);
    }

    return currentHighlight;
  };
};

/**
 * Returns the provided value if it passes the filter function,
 * otherwise returns the current value
 */
function filteredResult<T extends HTMLElement>(
  descendant?: Descendant<T>,
  current?: Descendant<T>,
  filter?: (d: Descendant<T>) => boolean,
): Descendant<T> | undefined {
  // If the target descendant is not defined, we return that value
  // (to unset the highlight)
  if (!descendant) return descendant;

  if (filter) {
    const isValid = filter(descendant);
    // if a filter exists, we return the provided descendant if it's valid,
    // otherwise we leave the highlight unchanged
    return isValid ? descendant : current;
  }

  return descendant;
}
