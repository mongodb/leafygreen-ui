import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

type RowContextProps = PropsWithChildren<{
  disabled: boolean;
  // depth: number;
  // isExpanded: boolean;
  // isExpandable: boolean;
  // toggleExpanded: () => void;
  isReactTable: boolean;
}>;

const RowContext = createContext<RowContextProps>({
  isReactTable: false,
  disabled: false,
  // depth: 0,
  // isExpandable: false,
  // isExpanded: false,
  // toggleExpanded: () => {},
});

export const useRowContext = () => useContext(RowContext);

// export const RowContextProvider = ({ children, disabled }: RowContextProps) => {
export const RowContextProvider = ({
  children,
  disabled,
  // depth,
  // isExpanded,
  // isExpandable,
  isReactTable,
}: // toggleExpanded,
RowContextProps) => {
  const providerData = useMemo(() => {
    return {
      disabled,
      // depth,
      // isExpanded,
      // isExpandable,
      isReactTable,
      // toggleExpanded,
    };
  }, [disabled, isReactTable]);

  return (
    <RowContext.Provider value={providerData}>{children}</RowContext.Provider>
  );
};
