import { useEffect } from 'react';
import { colors } from '@lg-charts/colors';
import { useSeriesContext } from '@lg-charts/series-provider';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChartContext } from '../ChartContext';

import { defaultLineOptions } from './config';
import { LineProps } from './Line.types';

export function Line({ name, data }: LineProps) {
  const { theme } = useDarkMode();
  const {
    chart: { addSeries, ready, removeSeries },
  } = useChartContext();
  const { getSeriesIndex, isChecked } = useSeriesContext();

  const id = useIdAllocator({ prefix: 'line' });

  const themedColors = colors[theme];
  const colorIndex = getSeriesIndex(name) % themedColors.length; // loop through colors if more lines than available colors
  const color = themedColors[colorIndex];

  const isVisible = isChecked(name);

  useEffect(() => {
    if (!ready) return;

    if (isVisible) {
      addSeries({
        ...defaultLineOptions,
        id,
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
      removeSeries(id);
    }

    return () => {
      /**
       * Remove the series when the component unmounts to make sure the series
       * is removed when a `Line` is hidden.
       */
      removeSeries(id);
    };
  }, [addSeries, color, data, id, isVisible, name, ready, removeSeries, theme]);

  return null;
}

Line.displayName = 'Line';
