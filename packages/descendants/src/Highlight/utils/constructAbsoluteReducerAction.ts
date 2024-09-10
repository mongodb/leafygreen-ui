import { Position } from '../highlight.types';
import type { AbsoluteSetterArg, UpdateHighlightAction } from '../reducer';

export function constructAbsoluteReducerAction(
  arg: AbsoluteSetterArg,
): UpdateHighlightAction {
  if (typeof arg === 'number') {
    return {
      index: arg,
    };
  }

  if (typeof arg === 'string') {
    return Object.values(Position).includes(arg as Position)
      ? {
          position: arg as Position,
        }
      : {
          id: arg,
        };
  }

  return {
    value: arg,
  };
}
