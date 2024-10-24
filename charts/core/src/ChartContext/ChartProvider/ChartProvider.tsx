import React, { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { ChartOptions, SeriesOption } from '../../Chart/Chart.types';
import { ChartContext } from '../ChartContext';

interface ChartProviderProps extends DarkModeProps {
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
  addChartSeries: (series: SeriesOption) => void;
  removeChartSeries: (name: string) => void;
}

export const ChartProvider = ({
  children,
  chartOptions,
  updateChartOptions,
  addChartSeries,
  darkMode,
}: PropsWithChildren<ChartProviderProps>) => {
  return (
    <ChartContext.Provider
      value={{ chartOptions, updateChartOptions, darkMode, addChartSeries }}
    >
      {children}
    </ChartContext.Provider>
  );
};
