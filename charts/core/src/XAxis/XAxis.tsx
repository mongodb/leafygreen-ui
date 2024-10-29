import { useEffect } from 'react';

import { useChartContext } from '../ChartContext';

import { useXAxisOptions } from './config';
import { XAxisProps } from './XAxis.types';

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
 *     unit="GB"
 *   />
 * </Chart>
 */
export function XAxis(xAxisProps: XAxisProps) {
  const { updateChartOptions } = useChartContext();
  const xAxisOptions = useXAxisOptions(xAxisProps);

  useEffect(() => {
    updateChartOptions(xAxisOptions);
  }, [xAxisOptions]);

  return null;
}
