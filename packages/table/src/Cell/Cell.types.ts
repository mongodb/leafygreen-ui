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

export interface InternalCellProps extends BaseCellProps {}

export interface InternalCellWithRTProps extends InternalCellRequiredProps {}
