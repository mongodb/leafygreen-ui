import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { TableContextValues } from './types';

export const TableContext = createContext({});
export const useTableContext = () =>
  useContext<Partial<TableContextValues>>(TableContext);

const TableContextProvider = ({
  children,
  shouldAlternateRowColor,
  hasSelectableRows,
  selectedRows: selectedRowsProp,
}: PropsWithChildren<Partial<TableContextValues>>) => {
  const [selectedRows, setSelectedRows] = useState<Array<number>>(
    selectedRowsProp ?? [],
  );
  const [columnAlignments, setColumnAlignments] =
    useState<Record<number, 'left' | 'right' | 'center'>>();

  return (
    <TableContext.Provider
      value={{
        hasSelectableRows,
        selectedRows,
        setSelectedRows,
        shouldAlternateRowColor,
        columnAlignments,
        setColumnAlignments,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
