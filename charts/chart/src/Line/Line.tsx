import { useEffect } from 'react';

import { useChartContext } from '../ChartContext';

import { defaultLineOptions } from './config';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { addChartSeries, removeChartSeries } = useChartContext();

  useEffect(() => {
    addChartSeries({
      ...defaultLineOptions,
      name,
      data,
    });

    return () => {
      /**
       * Remove the series when the component unmounts to make sure the series
       * is removed when a `Line` is hidden.
       */
      removeChartSeries(name);
    };
  }, [name, data]);

  return null;
}

Line.displayName = 'Line';
