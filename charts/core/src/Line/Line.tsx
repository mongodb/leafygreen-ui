import { useEffect } from 'react';

import { useChartContext } from '../ChartContext';

import { defaultLineOptions } from './config';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { chart } = useChartContext();

  useEffect(() => {
    if (!chart.ready) return;

    chart.addSeries({
      ...defaultLineOptions,
      name,
      data,
    });

    return () => {
      /**
       * Remove the series when the component unmounts to make sure the series
       * is removed when a `Line` is hidden.
       */
      chart.removeSeries(name);
    };
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.ready, name, data]);

  return null;
}

Line.displayName = 'Line';
