import { Reducer } from 'react';

import { ExclusiveUnion, ValuesOf } from '@leafygreen-ui/lib';

import { Descendant } from '../../Descendants';
import { Direction, Position } from '../highlight.types';

export interface ActionType {
  /** A relative {@link Direction} to move the highlight */
  direction: Direction;

  /** A relative distance to move the highlight */
  delta: number;

  /** An absolute {@link Position} in the list to set the highlight */
  position: Position;

  /** An explicit index to set the highlight */
  index: number;

  /** An explicit id to set the highlight */
  id: string;

  /** An explicit descendant value */
  value: Descendant<any>;
}

export type UpdateHighlightAction = ExclusiveUnion<ActionType>;
export type HighlightReducerFunction<T extends HTMLElement> = Reducer<
  Descendant<T> | undefined,
  UpdateHighlightAction
>;

export type AbsoluteSetterArg = ValuesOf<
  Pick<ActionType, 'id' | 'index' | 'position' | 'value'>
>;
export type RelativeSetterArg = ValuesOf<
  Pick<ActionType, 'delta' | 'direction'>
>;
export type AbsoluteHighlightSetter = (abs: AbsoluteSetterArg) => void;
export type RelativeHighlightSetter = (rel: RelativeSetterArg) => void;
