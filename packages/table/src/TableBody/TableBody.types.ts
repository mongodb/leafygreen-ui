import { HTMLElementProps } from '@leafygreen-ui/lib';

export type TableBodyProps<T extends unknown> = {
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
