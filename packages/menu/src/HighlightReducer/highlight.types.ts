import { Reducer } from 'react';

import { Descendant } from '@leafygreen-ui/descendants';

export type Index = number | undefined;
const Direction = {
  Next: 'next',
  Prev: 'prev',
  First: 'first',
  Last: 'last',
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];

export type HighlightChangeHandler = (
  nextHighlight: Descendant | undefined,
) => void;

export type UpdateHighlightAction =
  | {
      direction: Direction;
      index?: never;
      id?: never;
    }
  | {
      index: number;
      direction?: never;
      id?: never;
    }
  | {
      id: string;
      direction?: never;
      index?: never;
    };

export type HighlightReducerFunction = Reducer<
  Descendant | undefined,
  UpdateHighlightAction
>;

export interface HighlightReducerReturnType {
  highlight: Descendant | undefined;
  moveHighlight: (direction: Direction) => void;
  setHighlight: (indexOrId: number | string) => void;
}
