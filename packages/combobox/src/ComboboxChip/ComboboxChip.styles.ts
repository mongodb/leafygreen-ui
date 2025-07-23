import { chipTextClassName } from '@leafygreen-ui/chip';
import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { typeScales } from '@leafygreen-ui/tokens';

import { ComboboxSize } from '../types';

export const chipClassName = createUniqueClassName('combobox-chip');

/**
 * The line-height of the combobox.
 */
export const lineHeight: Record<ComboboxSize, number> = {
  [ComboboxSize.XSmall]: 16,
  [ComboboxSize.Small]: typeScales.body1.lineHeight,
  [ComboboxSize.Default]: typeScales.body1.lineHeight,
  [ComboboxSize.Large]: typeScales.body2.lineHeight,
};

/**
 * The font-size of the combobox.
 */
export const fontSize: Record<ComboboxSize, number> = {
  [ComboboxSize.XSmall]: typeScales.body1.fontSize,
  [ComboboxSize.Small]: typeScales.body1.fontSize,
  [ComboboxSize.Default]: typeScales.body1.fontSize,
  [ComboboxSize.Large]: typeScales.body2.fontSize,
};

/**
 * Vertical padding on a chip (in px)
 */
export const chipWrapperPaddingY = {
  [ComboboxSize.XSmall]: 1,
  [ComboboxSize.Small]: 0,
  [ComboboxSize.Default]: 2,
  [ComboboxSize.Large]: 4,
} as const;

/**
 * Override chip sizes
 */
export const chipSizeStyles: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    font-size: ${fontSize[ComboboxSize.XSmall]}px;
    line-height: ${lineHeight[ComboboxSize.XSmall]}px;

    .${chipTextClassName} {
      padding-block: ${chipWrapperPaddingY[ComboboxSize.XSmall]}px;
    }
  `,
  [ComboboxSize.Small]: css`
    font-size: ${fontSize[ComboboxSize.Small]}px;
    line-height: ${lineHeight[ComboboxSize.Small]}px;

    .${chipTextClassName} {
      padding-block: ${chipWrapperPaddingY[ComboboxSize.Small]}px;
    }
  `,
  [ComboboxSize.Default]: css`
    font-size: ${fontSize[ComboboxSize.Default]}px;
    line-height: ${lineHeight[ComboboxSize.Default]}px;

    .${chipTextClassName} {
      padding-block: ${chipWrapperPaddingY[ComboboxSize.Default]}px;
    }
  `,
  [ComboboxSize.Large]: css`
    font-size: ${fontSize[ComboboxSize.Large]}px;
    line-height: ${lineHeight[ComboboxSize.Large]}px;

    .${chipTextClassName} {
      padding-inline-end: 10px;
      padding-block: ${chipWrapperPaddingY[ComboboxSize.Large]}px;
    }
  `,
};
