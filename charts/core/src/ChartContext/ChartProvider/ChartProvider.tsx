import React from 'react';
import { ChartContext } from '../ChartContext';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { ChartOptions } from '../../Chart/Chart.types';

interface ChartProviderProps extends DarkModeProps {
  children: React.ReactNode;
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
}

export const ChartProvider = ({
  children,
  chartOptions,
  updateChartOptions,
  darkMode,
}: ChartProviderProps) => {
  return (
    <ChartContext.Provider
      value={{ chartOptions, updateChartOptions, darkMode }}
    >
      {children}
    </ChartContext.Provider>
  );
};
