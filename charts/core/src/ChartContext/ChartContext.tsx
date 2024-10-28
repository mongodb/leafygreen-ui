import React, { createContext, PropsWithChildren, useContext } from 'react';

import { ChartContextType, ChartProviderProps } from './ChartContext.types';

export const ChartContext = createContext<ChartContextType | undefined>(
  undefined,
);

export const ChartProvider = ({
  children,
  chartOptions,
  updateChartOptions,
  addChartSeries,
}: PropsWithChildren<ChartProviderProps>) => {
  return (
    <ChartContext.Provider
      value={{ chartOptions, updateChartOptions, addChartSeries }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }

  return context;
};
