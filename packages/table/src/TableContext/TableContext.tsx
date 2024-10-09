import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LGRowData } from '../useLeafyGreenTable';

import { type TableContextValues } from './TableContext.types';

export const TableContext = createContext<
  Partial<TableContextValues<LGRowData>>
>({});

export const useTableContext = <T extends LGRowData>() =>
  useContext<TableContextValues<T>>(
    TableContext as React.Context<TableContextValues<T>>,
  );

//TODO: a seperate context for virtual scrolling?
const TableContextProvider = <T extends LGRowData>({
  children,
  darkMode,
  shouldAlternateRowColor,
  isVirtual,
  isSelectable,
  measureElement,
}: PropsWithChildren<Partial<TableContextValues<T>>>) => {
  /** The appropriately typed context provider */
  const TableProvider = (TableContext as React.Context<TableContextValues<T>>)
    .Provider;

  const providerData = useMemo(() => {
    return {
      shouldAlternateRowColor,
      darkMode,
      isVirtual,
      isSelectable,
      measureElement,
    };
  }, [
    shouldAlternateRowColor,
    darkMode,
    isVirtual,
    isSelectable,
    measureElement,
  ]);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <TableProvider value={providerData}>{children}</TableProvider>
    </LeafyGreenProvider>
  );
};

export default TableContextProvider;
