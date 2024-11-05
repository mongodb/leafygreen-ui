import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LGRowData } from '../useLeafyGreenTable';

import {
  type TableContextValues,
  type TableProviderValues,
} from './TableContext.types';
import VirtualTableContextProvider from './VirtualTableContext';

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
  shouldAlternateRowColor,
  isVirtual,
  isSelectable,
  shouldTruncate,
  virtualTable,
}: PropsWithChildren<Partial<TableProviderValues<T>>>) => {
  /** The appropriately typed context provider */
  const TableProvider = (TableContext as React.Context<TableProviderValues<T>>)
    .Provider;

  const tableProviderData = useMemo(() => {
    return {
      shouldAlternateRowColor,
      darkMode,
      isVirtual,
      isSelectable,
      shouldTruncate,
    };
  }, [
    shouldAlternateRowColor,
    darkMode,
    isVirtual,
    isSelectable,
    shouldTruncate,
  ]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <TableProvider value={tableProviderData}>
        <VirtualTableContextProvider virtualTable={virtualTable}>
          {children}
        </VirtualTableContextProvider>
      </TableProvider>
    </LeafyGreenProvider>
  );
};

export default TableContextProvider;
