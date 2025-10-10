import { useEffect } from 'react';
import { useSeriesContext } from '@lg-charts/series-provider';

import { useChartContext } from '../ChartContext';
import { EChartSeriesOption } from '../Echart';

export function Series(options: EChartSeriesOption) {
  const {
    chart: { addSeries, ready, removeSeries },
  } = useChartContext();
  const { isChecked } = useSeriesContext();

  const isVisible = isChecked(options.name);

  useEffect(() => {
    if (!ready) return;

    if (isVisible) {
      addSeries(options);
    } else {
      removeSeries(options.name);
    }

    return () => {
      /**
       * Remove the series when the component unmounts to make sure the series
       * is removed when a `Series` is hidden.
       */
      removeSeries(options.name);
    };
  }, [addSeries, isVisible, ready, removeSeries]);

  return null;
}

Series.displayName = 'Series';
