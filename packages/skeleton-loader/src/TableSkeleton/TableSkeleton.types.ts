import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface TableSkeletonProps
  extends DarkModeProps,
    HTMLElementProps<'table'> {
  /**
   * Base font size
   */
  baseFontSize?: BaseFontSize;

  /**
   * Number of columns
   * @default 4
   */
  numCols?: number;

  /**
   * Column labels. Empty strings or undefined values will be treated as unknown and render a simple skeleton.
   */
  columnLabels?: Array<string | undefined>;

  /**
   * Number of rows
   * @default 5
   */
  numRows?: number;
}
