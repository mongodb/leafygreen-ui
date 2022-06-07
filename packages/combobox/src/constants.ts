import { typeScales } from '@leafygreen-ui/tokens';
import { ComboboxSize } from './Combobox.types';

/**
 * Width of the widest character (in px)
 */
export const maxCharWidth: Record<ComboboxSize, number> = {
  [ComboboxSize.Default]: typeScales.body1.fontSize,
  [ComboboxSize.Large]: typeScales.body2.fontSize,
};

/**
 * Size of combobox x & y padding (in px)
 */
export const comboboxPadding: Record<ComboboxSize, { x: number; y: number }> = {
  [ComboboxSize.Default]: { x: 7, y: 5 },
  [ComboboxSize.Large]: { x: 11, y: 9 },
};

/**
 * Total height of the combobox (in px)
 */
export const comboboxHeight: Record<ComboboxSize, number> = {
  [ComboboxSize.Default]: 36,
  [ComboboxSize.Large]: 48,
};

/** Width of the dropdown caret icon (in px) */
export const caretIconSize = 16;

/** MENU */

/** Height of a menu item (in px) */
export const menuItemHeight = 36;

export const menuItemPadding: Record<ComboboxSize, { x: number; y: number }> = {
  [ComboboxSize.Default]: { x: 12, y: 8 },
  [ComboboxSize.Large]: { x: 12, y: 8 },
};

/** The padding on a Chip (in px) */
export const comboboxChipPadding = 6;
