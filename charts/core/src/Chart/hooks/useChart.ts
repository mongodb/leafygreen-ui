import { useEffect, useRef } from 'react';

import { ChartHookProps, ChartInstance } from './useChart.types';
import { useEchart } from '../../echarts/useEchart';

export function useChart({
  onChartReady = () => {},
  zoomSelect,
  onZoomSelect,
  groupId,
}: ChartHookProps): ChartInstance {
  const chartRef = useRef(null);
  const echart = useEchart(chartRef.current);

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
      if (onZoomSelect) {
        echart.on('zoomselect', zoomEventResponse => {
          onZoomSelect(zoomEventResponse);
        });
      }
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
