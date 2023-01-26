import { HTMLElementProps } from '@leafygreen-ui/lib';
import { LeafygreenTable } from '../useLeafygreenTable';

export interface TableBodyProps<T extends unknown>
  extends HTMLElementProps<'tbody'> {
  /**
   * Table object returned by the `useLeafygreenTable` hook.
   */
  table?: LeafygreenTable<T>;
  /**
   * Indicate whether the Table is rendering expandable rows in its body.
   */
  renderingExpandableRows?: boolean;
}
