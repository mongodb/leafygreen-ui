import merge from 'lodash.merge';
import { ChartOptions } from '../Chart.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useState } from 'react';
import { getDefaultOptions } from '../utils/defaultChartOptions';
import { DarkModeProps } from '@leafygreen-ui/lib';

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChartOptions({ darkMode: darkModeProp }: DarkModeProps) {
  const { theme } = useDarkMode(darkModeProp);
  const [chartOptions, setChartOptions] = useState<Partial<ChartOptions>>(
    getDefaultOptions(theme),
  );

  function addSeries(series: Pick<ChartOptions, 'series'>) {
    setChartOptions(currentOptions => {
      if (currentOptions?.series && currentOptions?.series.length > 0) {
        return {
          ...currentOptions,
          series: [...currentOptions?.series, series],
        };
      }
      return {
        ...currentOptions,
        series: [series],
      };
    });
  }

  function updateChartOptions(
    newOptions: Omit<Partial<ChartOptions>, 'series'>,
  ) {
    setChartOptions(currentOptions => {
      console.log('currentOptions:', currentOptions);
      console.log('newOptions:', newOptions);
      return merge({ ...currentOptions }, newOptions);
    });
  }

  return { chartOptions, updateChartOptions, addSeries };
}
