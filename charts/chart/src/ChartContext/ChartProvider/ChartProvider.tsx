import React from 'react';
import { ChartContext } from '../ChartContext';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { ChartOptions } from '../../Chart/Chart.types';

interface ChartProviderProps extends DarkModeProps {
  children: React.ReactNode;
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
  addSeries: (series: ChartOptions['series']) => void;
  removeSeries: (name: string) => void;
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
