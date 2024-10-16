import { createContext } from 'react';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { ChartOptions } from '../Chart/Chart.types';

export interface ChartContextType extends DarkModeProps {
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
  addSeries: (series: ChartOptions['series']) => void;
}

export const ChartContext = createContext<ChartContextType | undefined>(
  undefined,
);
