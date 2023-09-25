import React, { createContext, PropsWithChildren, useContext } from 'react';

type RowContextProps = PropsWithChildren<{
  disabled?: boolean;
}>;

const RowContext = createContext<RowContextProps>({});

export const useRowContext = () => useContext(RowContext);

export const RowContextProvider = ({ children, disabled }: RowContextProps) => {
  return (
    <RowContext.Provider
      value={{
        disabled,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};
