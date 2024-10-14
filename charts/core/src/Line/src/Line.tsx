import { useEffect } from 'react';
import { ChartOptions } from '../../Chart/src/Chart.types';
import { useChartContext } from '../../ChartContext';
import { defaultSeriesOption } from './config/defaultLineOptions';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { addSeries } = useChartContext();

  useEffect(() => {
    const option: Pick<ChartOptions, 'series'> = {
      ...defaultSeriesOption,
      name,
      data,
    };

    addSeries(option);
  }, [data]);

  return null;
}
