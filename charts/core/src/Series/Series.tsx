import { useEffect } from 'react';
import { useSeriesContext } from '@lg-charts/series-provider';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ValuesOf } from '@leafygreen-ui/lib';

import { useChartContext } from '../ChartContext';
import { EChartSeriesOptions, StylingContext } from '../Echart/Echart.types';

export function Series<T extends ValuesOf<EChartSeriesOptions>>({
  type,
  name,
  data,
  options,
}: {
  type: T['type'];
  name: T['name'];
  data: T['data'];
  options: (ctx: StylingContext) => T['options'];
}) {
  const {
    chart: { addSeries, ready, removeSeries },
  } = useChartContext();
  const { theme } = useDarkMode();
  const { isChecked, getColor } = useSeriesContext();
  const seriesColor = getColor(name, theme) || undefined;
  const isVisible = isChecked(name);

  useEffect(() => {
    if (!ready) return;

    if (isVisible) {
      const context = { seriesColor };
      addSeries({
        type,
        name,
        data,
        ...options(context),
      });
    } else {
      removeSeries(name);
    }

    return () => {
      /**
       * Remove the series when the component unmounts to make sure the series
       * is removed when a `Series` is hidden.
       */
      removeSeries(name);
    };
  }, [
    addSeries,
    isVisible,
    seriesColor,
    ready,
    removeSeries,
    type,
    name,
    data,
    options,
  ]);

  return null;
}

Series.displayName = 'Series';
