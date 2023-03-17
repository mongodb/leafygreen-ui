import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { LeafygreenTableValues } from '../useLeafygreenTable';

export interface TableProps extends HTMLElementProps<'table'>, DarkModeProps {
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
   *
   * TODO: Generic types
   */
  table?: LeafygreenTableValues<any, boolean>;
}
