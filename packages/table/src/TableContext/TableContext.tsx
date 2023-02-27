import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import _, { startsWith } from 'lodash';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ColumnAlignment, TableContextValues } from './TableContext.types';

export const TableContext = createContext({});
export const useTableContext = () => useContext<any>(TableContext);

const TableContextProvider = ({
  children,
  darkMode,
  shouldAlternateRowColor,
}: PropsWithChildren<Partial<TableContextValues>>) => {
  const [columnAlignments, setColumnAlignments] =
    useState<Record<number, ColumnAlignment>>();
  const [internalExpandedRows, setInternalExpandedRows] = useState<
    Record<string, boolean>
  >({});
  const isExpandedRow = (rowId: string) => rowId in internalExpandedRows;

  const toggleExpandedRow = (rowId: string) => {
    if (rowId in internalExpandedRows) {
      const newExpandedRows = { ...internalExpandedRows };
      Object.keys(newExpandedRows).forEach(function (key: string) {
        startsWith(key, rowId) && delete newExpandedRows[key];
      });
      setInternalExpandedRows(newExpandedRows);
    } else {
      setInternalExpandedRows(prevState => {
        const newState = { ...prevState, [rowId]: true };
        return newState;
      });
    }
  };

  return (
    <LeafygreenProvider darkMode={darkMode}>
      <TableContext.Provider
        value={{
          shouldAlternateRowColor,
          columnAlignments,
          setColumnAlignments,
          internalExpandedRows,
          isExpandedRow,
          toggleExpandedRow,
        }}
      >
        {children}
      </TableContext.Provider>
    </LeafygreenProvider>
  );
};

export default TableContextProvider;
