import { keyMap } from '@leafygreen-ui/lib';

import { Position, SizeGrowth } from './useResizable.types';

// Mappings for keyboard interactions based on the position
export const SIZE_GROWTH_KEY_MAPPINGS: Record<
  Position,
  { [key: string]: SizeGrowth }
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

export const RESIZER_SIZE = 2;
