import { useEffect } from 'react';

import { useChartContext } from '../ChartContext';

import { defaultLineOptions } from './config';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { addSeries } = useChartContext();

  useEffect(() => {
    addSeries({
      ...defaultLineOptions,
      name,
      data,
    });
  }, [name, data]);

  return null;
}

Line.displayName = 'Line';
