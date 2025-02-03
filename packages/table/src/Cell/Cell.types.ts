import {
  ComponentPropsWithRef,
  ForwardedRef,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
} from 'react';

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

  /**
   * If shouldTruncation={true} on `Table`, this prop will override truncation for this cell. This is helpful for cells that should never truncate, like buttons or icons since truncation hides hover/focus states.
   */
  overrideTruncation?: boolean;
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

// https://stackoverflow.com/a/58473012
// React.forwardRef can only work with plain function types.
/**
 * Type definition for `Cell` that works with generics.
 * cell is optional
 */
export interface CellComponentType {
  <T extends LGRowData>(
    props: CellProps<T>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<CellProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}

/**
 * Type definition for `InternalCellWithRT` that works with generics.
 * cell is required
 */
export interface InternalCellWithRTComponentType {
  <T extends LGRowData>(
    props: InternalCellWithRTProps<T>,
    ref: ForwardedRef<HTMLTableCellElement>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<InternalCellWithRTProps<LGRowData> & RefAttributes<any>>
      >
    | undefined;
}
