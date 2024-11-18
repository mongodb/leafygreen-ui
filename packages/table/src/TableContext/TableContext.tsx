import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LGRowData } from '../useLeafyGreenTable';

import { type TableProviderProps } from './TableContext.types';

export const TableContext = createContext<
  Partial<TableProviderProps<LGRowData>>
>({});

export const useTableContext = <T extends LGRowData>() =>
  useContext<TableProviderProps<T>>(
    TableContext as React.Context<TableProviderProps<T>>,
  );

const TableContextProvider = <T extends LGRowData>({
  children,
  darkMode,
  shouldAlternateRowColor,
  isVirtual,
  isSelectable,
  shouldTruncate,
  virtualTable,
}: PropsWithChildren<Partial<TableProviderProps<T>>>) => {
  /** The appropriately typed context provider */
  const TableProvider = (TableContext as React.Context<TableProviderProps<T>>)
    .Provider;

  const tableProviderData = useMemo(() => {
    return {
      shouldAlternateRowColor,
      darkMode,
      isVirtual,
      isSelectable,
      shouldTruncate,
      virtualTable,
    };
  }, [
    shouldAlternateRowColor,
    darkMode,
    isVirtual,
    isSelectable,
    shouldTruncate,
    virtualTable,
  ]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <TableProvider value={tableProviderData}>{children}</TableProvider>
    </LeafyGreenProvider>
  );
};

export default TableContextProvider;
