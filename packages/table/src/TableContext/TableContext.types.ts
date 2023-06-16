import { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { TableProps } from '../Table/Table.types';
import {
  LeafyGreenTable,
  LeafyGreenTableRow,
  LGRowData,
} from '../useLeafyGreenTable';

export type TableContextValues<T extends LGRowData> = PropsWithChildren<
  Pick<TableProps<T>, 'table' | 'shouldAlternateRowColor'>
> &
  DarkModeProps & {
    /** returns the table row object with the provided `id` */
    getRowById?: (id?: string) => LeafyGreenTableRow<T> | undefined;

    /** returns the parent table row object for the provided `id` if it is nested */
    getParentRow?: (id?: string) => LeafyGreenTableRow<T> | undefined;

    /**
     * The `useLeafyGreenTable` return value
     */
    table?: LeafyGreenTable<T>;
  };
