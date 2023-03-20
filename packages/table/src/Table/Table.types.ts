import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { LeafygreenTableValues, LGRowData } from '../useLeafygreenTable';

export interface TableProps<T extends LGRowData, VS extends boolean>
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
  table?: LeafygreenTableValues<T, VS>;
}
