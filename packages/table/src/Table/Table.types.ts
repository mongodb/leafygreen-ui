import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { LeafyGreenTable, LGRowData } from '../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../useLeafyGreenVirtualTable/useLeafyGreenVirtualTable.types';

export const VerticalAlignment = {
  Top: 'top',
  Middle: 'middle',
} as const;

export type VerticalAlignment =
  (typeof VerticalAlignment)[keyof typeof VerticalAlignment];

export interface TableProps<T extends LGRowData>
  extends HTMLElementProps<'table'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Determines whether alternating rows will have dark backgrounds.
   * @default false
   */
  shouldAlternateRowColor?: boolean;

  /**
   * The base font size of the title and text rendered in children.
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * Object returned from the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook
   */
  table?: LeafyGreenTable<T> | LeafyGreenVirtualTable<T>;

  /**
   * Whether all rows will truncate. If true, cells will truncate at one line. If false then there will be no height limit and cells will not truncate.
   * @default true
   */
  shouldTruncate?: boolean;

  /**
   * When rows truncation is disabled, this will determine if cell contents should be top or middle aligned
   * @default 'top'
   */
  verticalAlignment?: VerticalAlignment;
}
