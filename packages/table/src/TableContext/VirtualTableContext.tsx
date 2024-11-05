import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import { LGRowData } from '../useLeafyGreenTable';

import { type VirtualTableContextValues } from './TableContext.types';

export const VirtualTableContext = createContext<
  Partial<VirtualTableContextValues<LGRowData>>
>({});

export const useVirtualTableContext = <T extends LGRowData>() =>
  useContext<VirtualTableContextValues<T>>(
    VirtualTableContext as React.Context<VirtualTableContextValues<T>>,
  );

const VirtualTableContextProvider = <T extends LGRowData>({
  children,
  virtualTable,
}: PropsWithChildren<Partial<VirtualTableContextValues<T>>>) => {
  const VirtualTableProvider = (
    VirtualTableContext as React.Context<VirtualTableContextValues<T>>
  ).Provider;

  const providerData = useMemo(() => {
    return {
      virtualTable,
    };
  }, [virtualTable]);

  return (
    <VirtualTableProvider value={providerData}>{children}</VirtualTableProvider>
  );
};

export default VirtualTableContextProvider;
