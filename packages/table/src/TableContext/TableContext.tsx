import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LGRowData } from '../useLeafyGreenTable';

import { ColumnAlignment, TableContextValues } from './TableContext.types';

export const TableContext = createContext<
  TableContextValues<LGRowData, boolean>
>({});

export const useTableContext = <T extends LGRowData, VS extends boolean>() =>
  useContext<TableContextValues<T, VS>>(
    TableContext as React.Context<TableContextValues<T, VS>>,
  );

const TableContextProvider = <T extends LGRowData, VS extends boolean>({
  children,
  darkMode,
  table,
  shouldAlternateRowColor,
}: PropsWithChildren<Partial<TableContextValues<T, VS>>>) => {
  const getRowById = (id?: string) =>
    id ? table?.getRowModel().rowsById?.[id] : undefined;

  const getParentRow = (childId?: string) =>
    getRowById(getParentRowId(childId));

  /** The appropriately typed context provider */
  const TableProvider = (
    TableContext as React.Context<TableContextValues<T, VS>>
  ).Provider;

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <TableProvider
        value={{
          table,
          getRowById,
          getParentRow,
          shouldAlternateRowColor,
        }}
      >
        {children}
      </TableProvider>
    </LeafyGreenProvider>
  );
};

export default TableContextProvider;

function getParentRowId(childId?: string) {
  if (childId) {
    const childIds = childId.split('.'); // ['0']
    const parentId = childIds.slice(0, childIds.length - 1).join('.'); // []
    return parentId.length > 0 ? parentId : undefined;
  }
}
