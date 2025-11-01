import { useEffect } from 'react';
import merge from 'lodash/merge';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';
import { type EChartOptions } from '../Echart';

import { getAxisOptions, unsetAxisOptions } from './Axis';
import { YAxisProps } from './YAxis.types';

const getYAxisOptions = (
  theme: Theme,
  props: YAxisProps,
): Omit<EChartOptions, 'series'> => {
  const axisOptions = merge(getAxisOptions(theme, props), {
    axisLabel: {
      align: 'right',
      margin: spacing[200],
    },
    nameTextStyle: {
      padding: [0, 0, spacing[800], 0],
    },
    nameGap: spacing[900],
  });

  return {
    yAxis: axisOptions,
    grid: {
      left: props.label
        ? spacing[1200] // Pushes out to make room for the label
        : spacing[300], // Default left spacing
    },
  };
};

/**
 * React component that can render an y-axis on a parent chart.
 *
 * This is done by updating the parent chart's canvas configuration received via context.
 *
 * ```
 * <Chart>
 *   <YAxis
 *     type="value",
 *     label="My Y-Axis Data",
 *     formatter="{value}GB"
 *   />
 * </Chart>
 */
export function YAxis(props: YAxisProps) {
  const {
    chart: { ready, updateOptions },
  } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!ready) return;

    updateOptions(getYAxisOptions(theme, props));

    return () => {
      /**
       * Hides the axis when the component is unmounted.
       */
      updateOptions({
        yAxis: { ...unsetAxisOptions },
        grid: { left: spacing[300] }, // Reset the grid left spacing
      });
    };
  }, [ready, theme, updateOptions, props]);

  return null;
}
