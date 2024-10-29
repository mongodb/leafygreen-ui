import { useEffect } from 'react';

import { useChartContext } from '../ChartContext';

import { useYAxisOptions } from './config';
import { YAxisProps } from './YAxis.types';

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
 *     unit="GB"
 *   />
 * </Chart>
 */
export function YAxis(yAxisProps: YAxisProps) {
  const { updateChartOptions } = useChartContext();
  const yAxisOptions = useYAxisOptions(yAxisProps);

  useEffect(() => {
    updateChartOptions(yAxisOptions);
  }, [yAxisOptions]);

  return null;
}
