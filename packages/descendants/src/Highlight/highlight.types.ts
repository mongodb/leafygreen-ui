import { Descendant } from '../Descendants';

import { HighlightSetter, RelativeHighlightSetter } from './reducer';

export type Index = number | undefined;

const Direction = {
  Next: 'next',
  Prev: 'prev',
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

const Position = {
  First: 'first',
  Last: 'last',
} as const;
export type Position = (typeof Position)[keyof typeof Position];

export interface HighlightContextProps<T extends HTMLElement> {
  highlight: Descendant<T> | undefined;
  setHighlight: HighlightSetter;
}

export interface HighlightHookReturnType<T extends HTMLElement>
  extends HighlightContextProps<T> {
  moveHighlight: RelativeHighlightSetter;
}

export type HighlightChangeHandler<T extends HTMLElement> = (
  nextHighlight: Descendant<T> | undefined,
) => void;
