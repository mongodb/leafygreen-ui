import React, { createContext, PropsWithChildren, useContext } from 'react';

type RowContextProps = PropsWithChildren<{
  disabled: boolean;
  depth: number;
  isExpanded: boolean;
  isExpandable: boolean;
  toggleExpanded: () => void;
  isReactTable: boolean;
}>;

const RowContext = createContext<RowContextProps>({
  isReactTable: false,
  disabled: false,
  depth: 0,
  isExpandable: false,
  isExpanded: false,
  toggleExpanded: () => {},
});

export const useRowContext = () => useContext(RowContext);

// export const RowContextProvider = ({ children, disabled }: RowContextProps) => {
export const RowContextProvider = ({
  children,
  disabled,
  depth,
  isExpanded,
  isExpandable,
  isReactTable,
  toggleExpanded,
}: RowContextProps) => {
  return (
    <RowContext.Provider
      value={{
        disabled,
        depth,
        isExpanded,
        isExpandable,
        isReactTable,
        toggleExpanded,
      }}
    >
      {children}
    </RowContext.Provider>
  );
};
