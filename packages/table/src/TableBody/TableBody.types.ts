import { HTMLElementProps } from '@leafygreen-ui/lib';

import { LGRowData } from '../useLeafyGreenTable';

export type TableBodyProps<T extends LGRowData> = {
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
