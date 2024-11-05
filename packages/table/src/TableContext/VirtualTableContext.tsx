import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import { type VirtualTableContextValues } from './TableContext.types';

export const VirtualTableContext = createContext<
  Partial<VirtualTableContextValues>
>({});

export const useVirtualTableContext = () =>
  useContext<VirtualTableContextValues>(
    VirtualTableContext as React.Context<VirtualTableContextValues>,
  );

const VirtualTableContextProvider = ({
  children,
  virtualTable,
}: PropsWithChildren<Partial<VirtualTableContextValues>>) => {
  const VirtualTableProvider = (
    VirtualTableContext as React.Context<VirtualTableContextValues>
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
