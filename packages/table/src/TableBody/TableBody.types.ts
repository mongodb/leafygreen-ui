import { HTMLElementProps } from '@leafygreen-ui/lib';

import { LeafygreenTable } from '../useLeafygreenTable';

export type TableBodyProps<T extends unknown> = {
  /**
   * Table object returned by the `useLeafygreenTable` hook.
   */
  table?: LeafygreenTable<T>;
  /**
   * Indicate whether the Table is rendering expandable rows in its body.
   */
  renderingExpandableRows?: boolean;
} & (
  | ({
      renderingExpandableRows?: false;
      // only extends HTML props when renderingExpandableRows = false
    } & HTMLElementProps<'tbody'>)
  | {
      /**
       * Indicate whether the Table is rendering expandable rows in its body.
       */
      renderingExpandableRows: true;
    }
);
