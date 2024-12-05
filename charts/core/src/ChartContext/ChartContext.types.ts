import { ChartOptions, SeriesOption } from '../Chart/Chart.types';

export interface ChartContextType {
  chartOptions: any;
  updateChartOptions: (newOptions: Partial<ChartOptions>) => void;
  addChartSeries: (series: SeriesOption) => void;
  removeChartSeries: (name: string) => void;
}
