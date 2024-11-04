import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

type RowContextProps = PropsWithChildren<{
  disabled: boolean;
  isExpandable?: boolean;
  isExpanded?: boolean;
  depth?: number;
  toggleExpanded?: () => void;
}>;

const RowContext = createContext<RowContextProps>({
  disabled: false,
  isExpandable: false,
  isExpanded: false,
  depth: 0,
  toggleExpanded: () => {},
});

export const useRowContext = () => useContext(RowContext);

export const RowContextProvider = ({
  children,
  disabled,
  isExpandable,
  isExpanded,
  depth,
  toggleExpanded,
}: RowContextProps) => {
  const providerData = useMemo(() => {
    return {
      disabled,
      isExpanded,
      isExpandable,
      depth,
      toggleExpanded,
    };
  }, [depth, disabled, isExpandable, isExpanded, toggleExpanded]);

  return (
    <RowContext.Provider value={providerData}>{children}</RowContext.Provider>
  );
};
