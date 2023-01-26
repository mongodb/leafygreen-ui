import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { ColumnAlignment, TableContextValues } from './TableContext.types';

export const TableContext = createContext({});
export const useTableContext = () =>
  useContext<Partial<TableContextValues>>(TableContext);

const TableContextProvider = ({
  children,
  darkMode,
  shouldAlternateRowColor,
}: PropsWithChildren<Partial<TableContextValues>>) => {
  const [columnAlignments, setColumnAlignments] =
    useState<Record<number, ColumnAlignment>>();

  return (
    <LeafygreenProvider darkMode={darkMode}>
      <TableContext.Provider
        value={{
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
