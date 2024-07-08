import React, { createContext, PropsWithChildren, useContext } from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LGRowData } from '../useLeafyGreenTable';
import getParentRowId from '../utils/getParentRowId';

import { type TableContextValues } from './TableContext.types';

export const TableContext = createContext<
  Partial<TableContextValues<LGRowData>>
>({});

export const useTableContext = <T extends LGRowData>() =>
  useContext<TableContextValues<T>>(
    TableContext as React.Context<TableContextValues<T>>,
  );

const TableContextProvider = <T extends LGRowData>({
  children,
  darkMode,
  table,
  shouldAlternateRowColor,
  disableAnimations,
}: PropsWithChildren<Partial<TableContextValues<T>>>) => {
  const getRowById = (id?: string) =>
    id ? table?.getRowModel().rowsById?.[id] : undefined;

  const getParentRow = (childId?: string) =>
    getRowById(getParentRowId(childId));

  /** The appropriately typed context provider */
  const TableProvider = (TableContext as React.Context<TableContextValues<T>>)
    .Provider;

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <TableProvider
        value={{
          table,
          getRowById,
          getParentRow,
          shouldAlternateRowColor,
          disableAnimations,
        }}
      >
        {children}
      </TableProvider>
    </LeafyGreenProvider>
  );
};

export default TableContextProvider;
