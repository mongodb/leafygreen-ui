import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

type RowContextProps = PropsWithChildren<{
  disabled: boolean;
}>;

const RowContext = createContext<RowContextProps>({
  disabled: false,
});

export const useRowContext = () => useContext(RowContext);

export const RowContextProvider = ({ children, disabled }: RowContextProps) => {
  const providerData = useMemo(() => {
    return {
      disabled,
    };
  }, [disabled]);

  return (
    <RowContext.Provider value={providerData}>{children}</RowContext.Provider>
  );
};
