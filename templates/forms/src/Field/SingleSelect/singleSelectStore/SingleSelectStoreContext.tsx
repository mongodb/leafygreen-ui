import React, { createContext, useState, useContext } from 'react';
import SingleSelectStore from './SingleSelectStore';

const SingleSelectStoreContext = createContext<SingleSelectStore | null>(null);

export function useSingleSelectStore() {
  const context = useContext(SingleSelectStoreContext);

  if (!context) {
    throw new Error(
      'useSingleSelectStore must be used within a SingleSelectStoreProvider.',
    );
  }

  return context;
}

interface SingleSelectStoreProviderProps {
  children: React.ReactNode;
}

export const SingleSelectStoreProvider: React.FC<
  SingleSelectStoreProviderProps
> = ({ children }) => {
  const [singleSelectStore] = useState(() => new SingleSelectStore());

  return (
    <SingleSelectStoreContext.Provider value={singleSelectStore}>
      {children}
    </SingleSelectStoreContext.Provider>
  );
};
