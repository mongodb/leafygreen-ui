import { keyMap } from '@leafygreen-ui/lib';

import { Arrow, Position, SizeGrowth } from './useResizable.types';

export const RESIZER_SIZE = 2;

// Mappings for keyboard interactions based on the position
export const SIZE_GROWTH_KEY_MAPPINGS: Record<
  Position,
  Partial<Record<Arrow, SizeGrowth>>
> = {
  [Position.Right]: {
    [keyMap.ArrowLeft]: 'increase',
    [keyMap.ArrowRight]: 'decrease',
  },
  [Position.Left]: {
    [keyMap.ArrowRight]: 'increase',
    [keyMap.ArrowLeft]: 'decrease',
  },
  [Position.Bottom]: {
    [keyMap.ArrowUp]: 'increase',
    [keyMap.ArrowDown]: 'decrease',
  },
  [Position.Top]: {
    [keyMap.ArrowDown]: 'increase',
    [keyMap.ArrowUp]: 'decrease',
  },
};
