import { HTMLElementProps } from '@leafygreen-ui/lib';

export type Align = Extract<
  HTMLElementProps<'td'>['align'],
  'left' | 'right' | 'center'
>;

export const CellOverflowBehavior = {
  Default: 'default',
  Truncate: 'truncate',
  // TODO: `Expand`: The cell will expand to the height of its content
  // Expand: 'expand',
} as const;
export type CellOverflowBehavior =
  (typeof CellOverflowBehavior)[keyof typeof CellOverflowBehavior];

interface BaseCellProps extends HTMLElementProps<'td'> {
  /**
   * Alignment of the cell's contents
   *
   * Overrides `<td>`'s deprecated `align` prop
   */
  align?: Align;

  /** A `className` applied to the inner `div` of the Cell  */
  contentClassName?: string;

  /**
   * Defines how a cell should behave when its content is larger than the standard cell height.
   *
   * `Default`: The cell height will be fixed to the standard cell height (40px by default).
   * Any overflowing content will be clipped.
   *
   * `Truncate`: The cell height will be fixed to the standard cell height (40px by default),
   * and include an ellipsis before the content is clipped.
   *
   * Note: It's recommended to provide the same value for all cells in a given row.
   *
   * @default CellOverflowBehavior.Default
   */
  overflow?: CellOverflowBehavior;
}

export type CellProps = BaseCellProps;

export interface InternalCellProps extends BaseCellProps {
  /**
   * Index of the cell in its parent row.
   */
  cellIndex: number;

  /**
   * Depth of nesting its parent row has.
   */
  depth: number;

  /**
   * Defines whether the cell's row is visible (i.e. expanded)
   *
   * @default true
   */
  isVisible?: boolean;

  /**
   * Defines whether the cell's row is expandable
   *
   * @default false
   */
  isExpandable?: boolean;
}
