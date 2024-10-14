import React from 'react';
import { ChartContext } from '../ChartContext';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { ChartOptions } from '../../Chart/src/Chart.types';

interface ChartProviderProps extends DarkModeProps {
  children: React.ReactNode;
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
  addSeries: (series: Pick<ChartOptions, 'series'>) => void;
}

export const ChartProvider = ({
  children,
  chartOptions,
  updateChartOptions,
  addSeries,
  darkMode,
}: ChartProviderProps) => {
  return (
    <ChartContext.Provider
      value={{ chartOptions, updateChartOptions, darkMode, addSeries }}
    >
      {children}
    </ChartContext.Provider>
  );
};
