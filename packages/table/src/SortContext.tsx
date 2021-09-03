import React, { createContext, useContext, useMemo, useState } from 'react';

interface Sort {
  columnId: number;
  direction: 'asc' | 'desc';
  accessorValue?: (data: any) => string;
  compareFn?: (a: any, b: any, direction: 'asc' | 'desc') => number;
}

interface ContextInterface {
  sort?: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort | undefined>>;
}

const SortContext = createContext<ContextInterface>({
  sort: undefined,
  setSort: () => {},
});

export function SortProvider({ children }: { children: React.ReactNode }) {
  const [sort, setSort] = useState<Sort | undefined>(undefined);

  const contextValue = useMemo(() => {
    return { sort, setSort };
  }, [sort, setSort]);

  return (
    <SortContext.Provider value={contextValue}>{children}</SortContext.Provider>
  );
}

export function useSortContext() {
  return useContext(SortContext);
}

const alphanumericCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export const getDataComparisonFunction = <T extends {}>({
  direction,
  accessorValue,
  compareFn,
}: {
  direction: 'asc' | 'desc';
  accessorValue?: (data: T) => string;
  compareFn?: (a: T, b: T, dir: 'asc' | 'desc') => number;
}) => {
  if (accessorValue) {
    return (a: T, b: T) => {
      const aVal = accessorValue(a);
      const bVal = accessorValue(b);

      if (direction !== 'desc') {
        return alphanumericCollator.compare(aVal, bVal);
      }

      return alphanumericCollator.compare(bVal, aVal);
    };
  }

  if (compareFn) {
    return (a: T, b: T) => compareFn(a, b, direction);
  }

  console.error(
    'Error getting Table data comparison function. Please supply either an `accessorValue` or `compareFn`',
  );
};
