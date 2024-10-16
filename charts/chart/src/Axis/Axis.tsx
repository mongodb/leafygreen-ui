import { useChartContext } from '../ChartContext';
import { useEffect } from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ChartOptions } from '../Chart/Chart.types';
import { getDefaultXAxisOptions, getDefaultYAxisOptions } from './config';
import { AxisProps } from './Axis.types';
import { spacing } from '@leafygreen-ui/tokens';

export function Axis({
  x,
  y,
}: { x?: AxisProps; y: AxisProps } | { x: AxisProps; y?: AxisProps }) {
  const { updateChartOptions, darkMode } = useChartContext();
  const { theme } = useDarkMode(darkMode);

  useEffect(() => {
    const updatedOptions: Partial<ChartOptions> = {};

    if (x) {
      updatedOptions.xAxis = {
        ...getDefaultXAxisOptions(theme).xAxis,
        type: x.type,
      };
      if (x.label) {
        updatedOptions.xAxis.name = x.label;
        updatedOptions.grid = {
          ...updatedOptions.grid,
          bottom: spacing[900], // Prevents label from being cut off
        };
      }
    }

    if (y) {
      updatedOptions.yAxis = {
        ...getDefaultYAxisOptions(theme).yAxis,
        type: y.type,
      };
      if (y.label) {
        updatedOptions.yAxis.name = y.label;
        updatedOptions.grid = {
          ...updatedOptions.grid,
          left: spacing[1200], // Prevents label from being cut off
        };
      }
    }

    updateChartOptions(updatedOptions);
  }, [theme]);

  return null;
}
