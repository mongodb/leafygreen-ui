import { useEffect } from 'react';
import { colors } from '@lg-charts/colors';
import { useSeriesContext } from '@lg-charts/series-provider';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChartContext } from '../ChartContext';

import { defaultLineOptions } from './config';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { theme } = useDarkMode();
  const { chart } = useChartContext();
  const { getSeriesIndex, isChecked } = useSeriesContext();

  const { addSeries, ready, removeSeries } = chart;

  const themedColors = colors[theme];
  const colorIndex = getSeriesIndex(name) % themedColors.length; // loop through colors if more lines than available colors
  const color = themedColors[colorIndex];

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
          color,
        },
        itemStyle: {
          ...defaultLineOptions.itemStyle,
          color,
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
