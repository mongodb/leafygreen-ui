import { useEffect, useRef } from 'react';

import { useEchart } from '../../Echart';
import { getDefaultChartOptions } from '../config';

import type { ChartHookProps, ChartInstance } from './useChart.types';

export function useChart({
  onChartReady = () => {},
  zoomSelect,
  onZoomSelect,
  groupId,
  theme,
}: ChartHookProps): ChartInstance {
  const chartRef = useRef(null);
  const initialOptions = getDefaultChartOptions(theme);
  const echart = useEchart({ container: chartRef.current, initialOptions });

  useEffect(() => {
    if (echart.ready) {
      onChartReady();
    }
  }, [echart.ready]);

  useEffect(() => {
    if (echart.ready) {
      if (groupId) {
        echart.addToGroup(groupId);
      }
    }
  }, [echart.ready, groupId]);

  useEffect(() => {
    if (echart.ready) {
      echart.setupZoomSelect({
        xAxis: zoomSelect?.xAxis,
        yAxis: zoomSelect?.yAxis,
      });
    }
  }, [echart.ready, zoomSelect]);

  useEffect(() => {
    if (echart.ready && onZoomSelect) {
      echart.on('zoomselect', zoomEventResponse => {
        onZoomSelect(zoomEventResponse);
      });
    }
  }, [echart.ready, onZoomSelect]);

  return {
    ...echart,
    ref: chartRef,
  };
}
