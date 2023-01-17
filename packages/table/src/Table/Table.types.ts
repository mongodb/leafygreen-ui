import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface TableProps extends HTMLElementProps<'table'>, DarkModeProps {
  /**
   * Determines whether alternating rows will have dark backgrounds.
   */
  shouldAlternateRowColor?: boolean;
  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
}
