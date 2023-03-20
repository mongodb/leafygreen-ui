import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LGRowData } from '../useLeafygreenTable';

import { ColumnAlignment, TableContextValues } from './TableContext.types';

export const TableContext = createContext<TableContextValues<LGRowData, boolean>>({});

export const useTableContext = <
  T extends LGRowData,
  VS extends boolean
>() => useContext<TableContextValues<T, VS>>(TableContext as React.Context<TableContextValues<T, VS>>);

const TableContextProvider = <T extends LGRowData, VS extends boolean>({
  children,
  darkMode,
  table,
  shouldAlternateRowColor,
}: PropsWithChildren<Partial<TableContextValues<T, VS>>>) => {
  const [columnAlignments, setColumnAlignments] =
    useState<Array<ColumnAlignment>>();

  const getRowById = (id?: string) => id ? table?.getRowModel().rowsById?.[id] : undefined
  const getParentRow = (childId?: string) => getRowById(getParentRowId(childId))

  const { Provider } = (TableContext as React.Context<TableContextValues<T, VS>>)

  return (
    <LeafygreenProvider darkMode={darkMode}>
      <Provider
        value={{
          table,
          getRowById,
          getParentRow,
          shouldAlternateRowColor,
          columnAlignments,
          setColumnAlignments,
        }}
      >
        {children}
      </Provider>
    </LeafygreenProvider >
  );
};

export default TableContextProvider;

function getParentRowId(childId?: string) {
  if (childId) {
    const childIds = childId.split('.') // ['0']
    const parentId = childIds.slice(0, childIds.length - 1).join('.') // []
    return parentId.length > 0 ? parentId : undefined
  }
}
