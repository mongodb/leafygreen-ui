import { HTMLElementProps } from '@leafygreen-ui/lib';

export type Align = Extract<
  HTMLElementProps<'td'>['align'],
  'left' | 'right' | 'center'
>;

interface BaseCellProps extends HTMLElementProps<'td'> {
  /**
   * Alignment of the cell's contents
   *
   * Overrides `<td>`'s deprecated `align` prop
   */
  align?: Align;

  /** A `className` applied to the inner `div` of the Cell  */
  contentClassName?: string;

  cell?: any; //FIXME:
}

export type CellProps = BaseCellProps;

export type InternalCellRequiredProps = Omit<BaseCellProps, 'cell'> &
  Required<Pick<BaseCellProps, 'cell'>>;

export interface InternalCellProps extends InternalCellRequiredProps {
  /**
   * Index of the cell in its parent row.
   */
  cellIndex?: number;

  /**
   * Depth of nesting its parent row has.
   */
  depth?: number;

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
