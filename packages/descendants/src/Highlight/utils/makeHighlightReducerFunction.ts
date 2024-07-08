import {
  DescendantsList,
  getDescendantById,
  getDescendantByIndex,
} from '../../Descendants';
import type { HighlightReducerFunction } from '../highlight.types';

import { getNextFromDirection } from './getNextFromDirection';

/**
 * Creates a new reducer function for closure for a given `descendants` value
 */
export const makeHighlightReducerFunction =
  (getDescendants: () => DescendantsList): HighlightReducerFunction =>
  (currentHighlight, action) => {
    const descendants = getDescendants();

    // If we've received a direction, move the highlight
    if (action.direction) {
      const nextHighlight = getNextFromDirection(
        action.direction,
        currentHighlight,
        descendants,
      );
      return nextHighlight || currentHighlight;
    } else if (action.index) {
      const nextHighlight = getDescendantByIndex(action.index, descendants);
      return nextHighlight;
    } else if (action.id) {
      const nextHighlight = getDescendantById(action.id, descendants);
      return nextHighlight;
    }

    return currentHighlight;
  };
