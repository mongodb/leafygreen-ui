import React, { createContext, useContext, useMemo } from 'react';
import { State } from './utils';

// interface TableStateInterface {
//   sort?: {};
//   data?: {};
// }

interface ContextInterface {
  state?: State;
  dispatch?: React.Dispatch<any>;
}
const TableContext = createContext<ContextInterface>({});

export function useTableContext() {
  return useContext(TableContext);
}

interface TableProviderInterface {
  children: React.ReactNode;
  state: any;
  dispatch: React.Dispatch<any>;
}

export default function TableProvider({
  children,
  state,
  dispatch,
}: TableProviderInterface) {
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
}
