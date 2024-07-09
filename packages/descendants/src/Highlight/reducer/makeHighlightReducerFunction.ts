import {
  DescendantsList,
  getDescendantById,
  getDescendantByIndex,
} from '../../Descendants';
import { getNextFromDirection } from '../utils/getNextFromDirection';
import { getRelativeDescendant } from '../utils/getRelativeDescendant';

import { HighlightReducerFunction } from './reducer.types';

/**
 * Creates a new reducer function for closure for a given `descendants` value
 */
export const makeHighlightReducerFunction = <T extends HTMLElement>(
  getDescendants: () => DescendantsList<T>,
): HighlightReducerFunction<T> =>
  ((currentHighlight, action) => {
    const descendants = getDescendants();

    // If we've received a direction, move the highlight
    if (action.direction) {
      const nextHighlight = getNextFromDirection(
        action.direction,
        currentHighlight,
        descendants,
      );
      return nextHighlight || currentHighlight;
      // if we've received a delta, move the highlight
    } else if (typeof action.delta === 'number') {
      const nextHighlight = getRelativeDescendant(
        action.delta,
        currentHighlight,
        descendants,
      );
      return nextHighlight;
      // If we've received an explicit index, set the highlight
    } else if (typeof action.index === 'number') {
      const nextHighlight = getDescendantByIndex(action.index, descendants);
      return nextHighlight;
      // If we've received an explicit id, set the highlight
    } else if (typeof action.id === 'string') {
      const nextHighlight = getDescendantById(action.id, descendants);
      return nextHighlight;
    }

    return currentHighlight;
  }) as HighlightReducerFunction<T>;
