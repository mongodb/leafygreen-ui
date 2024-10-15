import { useChartContext } from '../ChartContext';
import { useEffect } from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ChartOptions } from '../Chart.types';
import { getDefaultXAxisOptions, getDefaultYAxisOptions } from './config';

interface AxisProps {
  type: string;
  label?: string;
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
      updatedOptions.xAxis = getDefaultXAxisOptions(theme);
      updatedOptions.yAxis = getDefaultYAxisOptions(theme);
    } else if (x) {
      updatedOptions.xAxis = getDefaultXAxisOptions(theme);
    } else if (y) {
      updatedOptions.yAxis = getDefaultYAxisOptions(theme);
    }

    updateChartOptions(updatedOptions);
  }, [theme]);

  return null;
}
