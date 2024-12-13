import { useEffect, useRef } from 'react';

import { ChartHookProps, ZoomSelectionEvent } from './useChart.types';
import { useEchart } from '../../echarts/useEchart';

export function useChart({
  onChartReady = () => {},
  zoomSelect,
  onZoomSelect,
  groupId,
}: ChartHookProps) {
  const chartRef = useRef(null);
  const echart = useEchart(chartRef.current);

  function handleDataZoom(params: any) {
    if (onZoomSelect) {
      if (zoomSelect?.xAxis && zoomSelect?.yAxis) {
        if (params.batch) {
          const { startValue: xStart, endValue: xEnd } = params.batch[0];
          const { startValue: yStart, endValue: yEnd } = params.batch[1];
          onZoomSelect({
            xAxis: { startValue: xStart, endValue: xEnd },
            yAxis: { startValue: yStart, endValue: yEnd },
          });
        }
      } else if (zoomSelect?.xAxis || zoomSelect?.yAxis) {
        const axis = zoomSelect?.xAxis ? 'xAxis' : 'yAxis';
        const zoomEventResponse: ZoomSelectionEvent = {};

        if (params.startValue && params.endValue) {
          zoomEventResponse[axis] = {
            startValue: params.startValue,
            endValue: params.endValue,
          };
          onZoomSelect(zoomEventResponse);
        } else if (params.batch) {
          const { startValue, endValue } = params.batch[0];
          zoomEventResponse[axis] = {
            startValue,
            endValue,
          };
          onZoomSelect(zoomEventResponse);
        }
      } else {
        console.error(
          'zoomSelect configuration provided without any axes props. Either xAxis or yAxis must be set.',
        );
      }
    }
  }

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
      echart.on('zoomselect', handleDataZoom);
    }
  }, [echart.ready, zoomSelect]);

  return {
    chartOptions: echart.options,
    updateChartOptions: echart.updateOptions,
    addChartSeries: echart.addSeries,
    removeChartSeries: echart.removeSeries,
    chartRef,
  };
}
