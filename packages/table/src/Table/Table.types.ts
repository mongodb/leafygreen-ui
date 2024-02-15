import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { LeafyGreenTable, LGRowData } from '../useLeafyGreenTable';

export interface TableProps<T extends LGRowData>
  extends HTMLElementProps<'table'>,
    DarkModeProps {
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
   * The `useLeafyGreenTable` return value
   */
  table?: LeafyGreenTable<T>;

  /**
   * Disables all transition animations for smoother rendering of tall content where appropriate
   * @default false
   */
  disableAnimations?: boolean;
}
