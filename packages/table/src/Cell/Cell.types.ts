import { ComponentPropsWithRef } from 'react';

import { LeafyGreenTableCell, LGRowData } from '../useLeafyGreenTable';

export type Align = Extract<
  ComponentPropsWithRef<'td'>['align'],
  'left' | 'right' | 'center'
>;

interface BaseCellProps extends ComponentPropsWithRef<'td'> {
  /**
   * Alignment of the cell's contents
   *
   * Overrides `<td>`'s deprecated `align` prop
   */
  align?: Align;

  /**
   * A `className` applied to the inner `div` of the Cell
   */
  contentClassName?: string;
}

export interface CellProps<T extends LGRowData> extends BaseCellProps {
  /**
   * The cell object that is returned when mapping through a row passed from the `useLeafyGreenTable` or `useLeafyGreenVirtualTable` hook.
   */
  cell?: LeafyGreenTableCell<T>;
}

export type InternalCellWithRTRequiredProps<T extends LGRowData> = Omit<
  CellProps<T>,
  'cell'
> &
  Required<Pick<CellProps<T>, 'cell'>>;

export interface InternalCellProps extends BaseCellProps {}

export interface InternalCellWithRTProps<T extends LGRowData>
  extends InternalCellWithRTRequiredProps<T> {}
