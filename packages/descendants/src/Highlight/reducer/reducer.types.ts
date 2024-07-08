import { Reducer } from 'react';

import { Descendant } from '../../Descendants';
import { Direction } from '../highlight.types';

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

export type HighlightReducerFunction<T extends HTMLElement> = Reducer<
  Descendant<T> | undefined,
  UpdateHighlightAction
>;

export type HighlightSetter = (indexOrId: number | string) => void;
export type RelativeHighlightSetter = (dir: Direction) => void;
