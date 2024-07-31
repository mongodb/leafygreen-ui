import { isDefined } from '@leafygreen-ui/lib';

import {
  Descendant,
  DescendantsList,
  getDescendantById,
  getDescendantByIndex,
} from '../../Descendants';
import { getDeltaFromDirection } from '../utils/getDeltaFromDirection';
import { getIndexFromPosition } from '../utils/getIndexFromPosition';
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

    // Move the highlight relative to the current highlight
    if (isDefined(action.delta) || isDefined(action.direction)) {
      const delta = action.delta ?? getDeltaFromDirection(action.direction!);
      const nextHighlight = getRelativeDescendant(
        delta,
        currentHighlight,
        descendants,
        options?.filter,
      );
      return nextHighlight; // getRelativeDescendant returns a `filter`ed value
    } else if (isDefined(action.index) || isDefined(action.position)) {
      // Explicitly set the highlight to the desired position or index
      const index =
        action.index ?? getIndexFromPosition(action.position!, descendants);
      const nextHighlight = getDescendantByIndex(index, descendants);
      return filteredResult(nextHighlight, currentHighlight, options?.filter);
    } else if (isDefined(action.id)) {
      // Explicitly set the highlight to the desired id
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
