import _ from 'lodash';
import { ChartOptions } from '../../Chart/Chart.types';
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
  const [chartOptions, setChartOptions] = useState(getDefaultOptions(theme));

  function updateChartOptions(newOptions: Partial<ChartOptions>) {
    const updatedOptions = _.merge({ ...chartOptions }, newOptions);
    setChartOptions(updatedOptions);
  }

  return { chartOptions, updateChartOptions };
}
