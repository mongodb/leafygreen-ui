import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

type RowContextProps = PropsWithChildren<{
  disabled: boolean;
  isReactTable: boolean;
}>;

const RowContext = createContext<RowContextProps>({
  isReactTable: false,
  disabled: false,
});

export const useRowContext = () => useContext(RowContext);

export const RowContextProvider = ({
  children,
  disabled,
  isReactTable,
}: RowContextProps) => {
  const providerData = useMemo(() => {
    return {
      disabled,
      isReactTable,
    };
  }, [disabled, isReactTable]);

  return (
    <RowContext.Provider value={providerData}>{children}</RowContext.Provider>
  );
};
