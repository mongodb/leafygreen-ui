import { useChartContext } from '../ChartOptionsContext';
import { useEffect } from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ChartOptions } from '../Chart/Chart.types';
import { getDefaultXAxisConfig, getDefaultYAxisConfig } from './config';

interface AxisProps {
  type: string;
  min?: number;
  max?: number;
  unit?: string;
}

export function Axis({
  x,
  y,
}: { x?: AxisProps; y: AxisProps } | { x: AxisProps; y?: AxisProps }) {
  const { updateChartOptions, darkMode } = useChartContext();
  const { theme } = useDarkMode(darkMode);

  useEffect(() => {
    const updatedOptions: Partial<ChartOptions> = {};

    if (x && y) {
      updatedOptions.xAxis = getDefaultXAxisConfig(theme);
      updatedOptions.yAxis = getDefaultYAxisConfig(theme);
      updateChartOptions(updatedOptions);
    } else if (x) {
      updatedOptions.xAxis = getDefaultXAxisConfig(theme);
      updatedOptions.yAxis = { show: false };
      updateChartOptions(updatedOptions);
    } else if (y) {
      updatedOptions.yAxis = getDefaultYAxisConfig(theme);
      updatedOptions.xAxis = { show: false };
      updateChartOptions(updatedOptions);
    }
  }, [theme]);

  return null;
}
