import { useEffect } from 'react';
import merge from 'lodash/merge';

import { useObjectDependency } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';
import { type EChartOptions } from '../Echart';

import { getAxisOptions, unsetAxisOptions } from './Axis';
import { XAxisProps } from './XAxis.types';

const getXAxisOptions = (
  theme: Theme,
  props: XAxisProps,
): Omit<EChartOptions, 'series'> => {
  const axisOptions = merge(getAxisOptions(theme, props), {
    axisLabel: {
      align: 'center',
      margin: spacing[400],
    },
    nameTextStyle: {
      lineHeight: spacing[400],
      padding: [spacing[200], 0, 0, 0],
    },
    nameGap: spacing[1000],
  });

  return {
    xAxis: axisOptions,
    grid: {
      bottom: props.label
        ? spacing[1200] // Pushes out to make room for the label
        : spacing[400], // Default bottom spacing
    },
  };
};

/**
 * React component that can render an x-axis on a parent chart.
 *
 * This is done by updating the parent chart's canvas configuration received via context.
 *
 * ```
 * <Chart>
 *   <XAxis
 *     type="time",
 *     label="My X-Axis Data",
 *     formatter="{value}GB"
 *   />
 * </Chart>
 */
export function XAxis(props: XAxisProps) {
  const {
    chart: { ready, updateOptions },
  } = useChartContext();
  const { theme } = useDarkMode();
  const propsDep = useObjectDependency(props);

  useEffect(() => {
    if (!ready) return;

    updateOptions(getXAxisOptions(theme, propsDep));

    return () => {
      /**
       * Hides the axis when the component is unmounted.
       */
      updateOptions({
        xAxis: { ...unsetAxisOptions },
        grid: { bottom: spacing[400] }, // Reset the grid bottom spacing
      });
    };
  }, [ready, theme, updateOptions, propsDep]);

  return null;
}
