import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface TableSkeletonProps
  extends DarkModeProps,
    HTMLElementProps<'table'> {
  /**
   * Number of columns
   */
  numCols: number;

  /**
   * Column labels. Empty strings will be treated as unknown and render a simple skeleton.
   */
  columnLabels?: Array<string>;

  /**
   * Number of rows
   * @default 5
   */
  numRows?: number;
}
