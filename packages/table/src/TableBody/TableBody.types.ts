import { HTMLElementProps } from '@leafygreen-ui/lib';
import { LeafygreenTable } from '../useLeafygreenTable';

export interface TableBodyProps extends HTMLElementProps<'tbody'> {
  /**
   * Table object returned by the `useLeafygreenTable` hook.
   */
  table?: LeafygreenTable;
  /**
   * Indicate whether the Table is rendering expandable rows in its body.
   */
  renderingExpandableRows?: boolean;
}
