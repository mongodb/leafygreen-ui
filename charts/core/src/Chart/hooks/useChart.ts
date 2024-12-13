import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { ChartOptions, SeriesOption } from '../../Chart/Chart.types';
import { chartSeriesColors } from '../chartSeriesColors';
import { getDefaultChartOptions } from '../config';

import { addSeries, removeSeries, updateOptions } from './updateUtils';
import { ChartHookProps, ZoomSelectionEvent } from './useChart.types';
import { useEchart } from '../../echarts/useEchart';

export function useChart({
  onChartReady = () => {},
  zoomSelect,
  onZoomSelect,
  groupId,
}: ChartHookProps) {
  const chartRef = useRef(null);
  const {
    chart,
    isLoading,
    chartOptions,
    on,
    addToGroup,
    setupZoomSelect,
    addChartSeries,
    removeChartSeries,
    updateChartOptions,
  } = useEchart(chartRef.current);

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
    if (chart) {
      onChartReady();
    }
  }, [chart]);

  useEffect(() => {
    if (chart) {
      if (groupId) {
        addToGroup(groupId);
      }
    }
  }, [chart, groupId]);

  useEffect(() => {
    if (chart) {
      setupZoomSelect({ xAxis: zoomSelect?.xAxis, yAxis: zoomSelect?.yAxis });
      on('zoomSelect', handleDataZoom);
    }
  }, [chart, zoomSelect]);

  return {
    chartOptions,
    updateChartOptions,
    addChartSeries,
    removeChartSeries,
    chartRef,
  };
}
