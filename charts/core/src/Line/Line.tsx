import { useEffect } from 'react';
import { useSeriesContext } from '@lg-charts/series-provider';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChartContext } from '../ChartContext';

import { defaultLineOptions } from './config';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { theme } = useDarkMode();
  const {
    chart: { addSeries, ready, removeSeries },
  } = useChartContext();
  const { getColor, isChecked } = useSeriesContext();

  const color = getColor(name, theme);
  const isVisible = isChecked(name);

  useEffect(() => {
    if (!ready) return;

    if (isVisible) {
      addSeries({
        ...defaultLineOptions,
        name,
        data,
        lineStyle: {
          ...defaultLineOptions.lineStyle,
          color: color || undefined,
        },
        itemStyle: {
          ...defaultLineOptions.itemStyle,
          color: color || undefined,
        },
      });
    } else {
      removeSeries(name);
    }

    return () => {
      /**
       * Remove the series when the component unmounts to make sure the series
       * is removed when a `Line` is hidden.
       */
      removeSeries(name);
    };
  }, [addSeries, color, data, isVisible, name, ready, removeSeries, theme]);

  return null;
}

Line.displayName = 'Line';
