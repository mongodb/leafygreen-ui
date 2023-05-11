import { HTMLElementProps } from '@leafygreen-ui/lib';

export type Align = Extract<
  HTMLElementProps<'td'>['align'],
  'left' | 'right' | 'center'
>;

interface AlignProp {
  /**
   * Alignment of the cell's contents
   *
   * Overrides `<td>`'s deprecated `align` prop
   */
  align?: Align;
}

export type CellProps = HTMLElementProps<'td'> & AlignProp;

export type InternalCellProps = CellProps &
  AlignProp & {
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
  };
