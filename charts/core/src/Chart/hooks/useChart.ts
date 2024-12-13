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
  const chart = useEchart(chartRef.current);

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
    if (chart.instance) {
      onChartReady();
    }
  }, [chart.instance]);

  useEffect(() => {
    if (chart.instance) {
      if (groupId) {
        chart.addToGroup(groupId);
      }
    }
  }, [chart.instance, groupId]);

  useEffect(() => {
    if (chart.instance) {
      chart.setupZoomSelect({
        xAxis: zoomSelect?.xAxis,
        yAxis: zoomSelect?.yAxis,
      });
      chart.on('zoomSelect', handleDataZoom);
    }
  }, [chart.instance, zoomSelect]);

  return {
    chartOptions: chart.options,
    updateChartOptions: chart.updateOptions,
    addChartSeries: chart.addSeries,
    removeChartSeries: chart.removeSeries,
    chartRef,
  };
}
