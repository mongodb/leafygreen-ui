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
  const {
    chart: { addSeries, ready, removeSeries },
  } = useChartContext();
  const { theme } = useDarkMode();

  const name =
    type === 'line'
      ? `event-marker-${position}`
      : `event-marker-${position[0]}-${position[1]}`;

  useEffect(() => {
    if (!ready) return;

    /**
     * Threshold lines/Points in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a ChartTooltip.
     */
    addSeries(
      getMarkConfig({ name, theme, label, message, level, position, type }),
    );

    return () => {
      removeSeries(name);
    };
  }, [
    addSeries,
    label,
    level,
    message,
    name,
    position,
    ready,
    removeSeries,
    theme,
    type,
  ]);

  return null;
}
