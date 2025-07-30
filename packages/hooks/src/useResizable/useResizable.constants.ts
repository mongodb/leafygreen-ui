import { keyMap } from '@leafygreen-ui/lib';

import { Arrow, Position, SizeGrowth } from './useResizable.types';

export const RESIZER_SIZE = 2;
export const KEYBOARD_RESIZE_PIXEL_STEP = 50;

// Mappings for keyboard interactions based on the position
export const SIZE_GROWTH_KEY_MAPPINGS: Record<
  Position,
  Partial<Record<Arrow, SizeGrowth>>
> = {
  [Position.Right]: {
    [keyMap.ArrowLeft]: SizeGrowth.Increase,
    [keyMap.ArrowRight]: SizeGrowth.Decrease,
  },
  [Position.Left]: {
    [keyMap.ArrowRight]: SizeGrowth.Increase,
    [keyMap.ArrowLeft]: SizeGrowth.Decrease,
  },
  [Position.Bottom]: {
    [keyMap.ArrowUp]: SizeGrowth.Increase,
    [keyMap.ArrowDown]: SizeGrowth.Decrease,
  },
  [Position.Top]: {
    [keyMap.ArrowDown]: SizeGrowth.Increase,
    [keyMap.ArrowUp]: SizeGrowth.Decrease,
  },
};
