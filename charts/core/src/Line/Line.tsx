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

  const themedColors = colors[theme];
  const colorIndex = getSeriesIndex(name) % themedColors.length; // loop through colors if more lines than available colors
  const color = themedColors[colorIndex];
  const isVisible = isChecked(name);

  useEffect(() => {
    if (!chart.ready) return;

    chart.addSeries({
      ...defaultLineOptions,
      name,
      data,
      lineStyle: {
        ...defaultLineOptions.lineStyle,
        color,
        opacity: isVisible ? 1 : 0,
      },
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
  }, [chart.ready, name, data, isVisible, theme]);

  return null;
}

Line.displayName = 'Line';
