import { Reducer } from 'react';

import { Descendant } from '../../Descendants';
import { Direction } from '../highlight.types';

export type UpdateHighlightAction =
  | {
      direction: Direction;
      delta?: never;
      index?: never;
      id?: never;
    }
  | {
      delta: number;
      direction?: never;
      index?: never;
      id?: never;
    }
  | {
      index: number;
      direction?: never;
      delta?: never;
      id?: never;
    }
  | {
      id: string;
      direction?: never;
      delta?: never;
      index?: never;
    };

export type HighlightReducerFunction<T extends HTMLElement> = Reducer<
  Descendant<T> | undefined,
  UpdateHighlightAction
>;

export type HighlightSetter = (indexOrId: number | string) => void;
export type RelativeHighlightSetter = (dirOrRel: Direction | number) => void;
