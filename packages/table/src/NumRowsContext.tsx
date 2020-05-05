import React, { useContext, createContext } from 'react';

interface NumRowsProviderProps {
  children: React.ReactNode;
  numRows?: number;
}

const NumRowsContext = createContext<number>(0);

export function useNumRows() {
  return useContext(NumRowsContext);
}

function NumRowsProvider({ children, numRows = 0 }: NumRowsProviderProps) {
  return (
    <NumRowsContext.Provider value={numRows}>
      {children}
    </NumRowsContext.Provider>
  );
}

NumRowsProvider.displayName = 'NumRowsProvider';

export default NumRowsProvider;
