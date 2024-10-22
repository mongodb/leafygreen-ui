import { createContext } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { ChartOptions, SeriesOption } from '../Chart/Chart.types';

export interface ChartContextType extends DarkModeProps {
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
  addChartSeries: (series: SeriesOption) => void;
}

export const ChartContext = createContext<ChartContextType | undefined>(
  undefined,
);
