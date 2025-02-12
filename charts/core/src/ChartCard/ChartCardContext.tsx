import React, { createContext, PropsWithChildren, useContext } from 'react';

import { ChartCardStates } from './ChartCard.types';

interface ChartCardContextType {
  state: ChartCardStates;
}

const ChartCardContext = createContext<ChartCardContextType | undefined>(
  undefined,
);

export function ChartCardProvider({
  state,
  children,
}: PropsWithChildren<ChartCardContextType>) {
  return (
    <ChartCardContext.Provider value={{ state }}>
      {children}
    </ChartCardContext.Provider>
  );
}

export function useChartCardContext() {
  return useContext(ChartCardContext);
}
