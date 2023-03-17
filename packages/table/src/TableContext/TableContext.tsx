import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ColumnAlignment, initialTableContext, TableContextValues } from './TableContext.types';

export const TableContext = createContext<TableContextValues>(initialTableContext);
export const useTableContext = () => useContext<TableContextValues>(TableContext);

const TableContextProvider = ({
  children,
  darkMode,
  table,
  shouldAlternateRowColor,
}: PropsWithChildren<Partial<TableContextValues>>) => {
  const [columnAlignments, setColumnAlignments] =
    useState<Array<ColumnAlignment>>();

  const getRowById = (id?: string) => id ? table?.getRowModel().rowsById?.[id] : undefined
  const getParentRow = (childId?: string) => getRowById(getParentRowId(childId))

  return (
    <LeafygreenProvider darkMode={darkMode}>
      <TableContext.Provider
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
      </TableContext.Provider>
    </LeafygreenProvider>
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