import { Descendant, DescendantsList } from '../Descendants';

import { AbsoluteHighlightSetter, RelativeHighlightSetter } from './reducer';

export type Index = number | undefined;

export const Direction = {
  Next: 'next',
  Prev: 'prev',
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

export const Position = {
  First: 'first',
  Last: 'last',
} as const;
export type Position = (typeof Position)[keyof typeof Position];

export interface HighlightContextProps<T extends HTMLElement> {
  /** The currently highlighted object */
  highlight: Descendant<T> | undefined;
  /**
   * An absolute setter function.
   * Sets the highlight to an explicit `id`, `index`, {@link Position}, or {@link Descendant} value
   */
  setHighlight: AbsoluteHighlightSetter;
}

export interface HighlightHookReturnType<T extends HTMLElement>
  extends HighlightContextProps<T> {
  /**
   * A relative setter function.
   * Provide a {@link Direction} or `delta` number
   * to move the highlight relative to the current value
   */
  moveHighlight: RelativeHighlightSetter;
}

export type HighlightChangeHandler<T extends HTMLElement> = (
  nextHighlight: Descendant<T> | undefined,
) => void;

export interface UseHighlightOptions<T extends HTMLElement> {
  /**
   * A callback fired when the highlight changes
   */
  onChange?: HighlightChangeHandler<T>;

  /**
   * Filters descendants that are enabled
   */
  filter?: (d: Descendant<T>) => boolean;

  /**
   * A callback fired once when the descendants context is initialized
   */
  onInit?: (descendants: DescendantsList<T>) => void;
}
