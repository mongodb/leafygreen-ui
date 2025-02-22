import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChartContext } from '../../ChartContext';

import {
  BaseEventMarkerLineProps,
  BaseEventMarkerPointProps,
  EventLevel,
} from './BaseEventMarker.types';
import { getMarkConfig } from './utils';

export function BaseEventMarker({
  position,
  label,
  message,
  level = EventLevel.Warning,
  type,
}: BaseEventMarkerLineProps | BaseEventMarkerPointProps) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name =
    type === 'line'
      ? `event-marker-${position}`
      : `event-marker-${position[0]}-${position[1]}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines/Points in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(
      getMarkConfig({ name, theme, label, message, level, position, type }),
    );

    return () => {
      chart.removeSeries(name);
    };
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, chart.ready, position, label, message, level, type]);

  return null;
}
