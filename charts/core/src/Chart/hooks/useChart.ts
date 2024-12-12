import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { ChartOptions, SeriesOption } from '../../Chart/Chart.types';
import { chartSeriesColors } from '../chartSeriesColors';
import { getDefaultChartOptions } from '../config';

import { addSeries, removeSeries, updateOptions } from './updateUtils';
import { ChartHookProps, ZoomSelectionEvent } from './useChart.types';
import { useEchartsInstance } from '../../Echarts/useEchartsInstance';

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChart({
  theme,
  onChartReady = () => {},
  zoomSelect,
  onZoomSelect,
  groupId,
}: ChartHookProps) {
  const chartRef = useRef(null);
  const { chart, echarts } = useEchartsInstance(chartRef.current);
  const [chartOptions, setChartOptions] = useState(
    getDefaultChartOptions(theme),
  );

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

    /**
     * If start is not 0% or end is not 100%, the 'dataZoom' event was triggered by a zoom.
     * We override the zoom to provide new values to the handler.
     */
    const isZoomed = params?.start !== 0 || params?.end !== 100;

    if (chart && isZoomed) {
      chart.dispatchAction({
        type: 'dataZoom',
        start: 0, // percentage of starting position
        end: 100, // percentage of ending position
      });
    }
  }

  // Initialize the chart
  useEffect(() => {
    if (!chart || !echarts) return;

    chart.setOption(chartOptions);

    // Connects a chart to a group which allows for synchronized tooltips
    if (groupId) {
      chart.group = groupId;
      echarts.connect(groupId);
    }

    // ECharts does not automatically resize when the window resizes.
    const resizeHandler = () => {
      chart.resize();
    };
    window.addEventListener('resize', resizeHandler);

    chart.on('rendered', function onInitialRender() {
      // Enable zooming by default by dispatching the "dataZoomSelect" action.
      chart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: zoomSelect?.xAxis || zoomSelect?.yAxis,
      });

      chart.on('dataZoom', handleDataZoom);
      onChartReady();
      chart.off('rendered', onInitialRender);
    });

    return () => {
      window.removeEventListener('resize', resizeHandler);
      chart.dispose();
    };
  }, [chart, echarts]);

  // Set which axis zoom is enabled on
  useEffect(() => {
    // `0` index enables zoom on that index, `'none'` disables zoom on that index
    let xAxisIndex: number | string = 0;
    let yAxisIndex: number | string = 0;
    if (!zoomSelect?.xAxis) {
      xAxisIndex = 'none';
    }
    if (!zoomSelect?.yAxis) {
      yAxisIndex = 'none';
    }
    updateChartOptions({
      toolbox: {
        feature: {
          dataZoom: {
            xAxisIndex,
            yAxisIndex,
          },
        },
      },
    });
  }, [zoomSelect]);

  const updateChartRef = useMemo(
    () =>
      debounce((chartOptions: Partial<ChartOptions>) => {
        /**
         * The second argument is `true` to merge the new options with the existing ones.
         * This is needed to ensure that series get removed properly.
         * See issue: https://github.com/apache/echarts/issues/6202
         * */
        chart?.setOption(chartOptions, true);
      }, 50),
    [],
  );

  const addChartSeries = useCallback(
    (data: SeriesOption) => {
      setChartOptions(currentOptions => {
        const updatedOptions = addSeries(currentOptions, data);
        updateChartRef(updatedOptions);
        return updatedOptions;
      });
    },
    [updateChartRef],
  );

  const removeChartSeries = useCallback(
    (name: string) => {
      setChartOptions(currentOptions => {
        const updatedOptions = removeSeries(currentOptions, name);
        updateChartRef(updatedOptions);
        return updatedOptions;
      });
    },
    [updateChartRef],
  );

  const updateChartOptions = useCallback(
    (options: Omit<Partial<ChartOptions>, 'series'>) => {
      setChartOptions(currentOptions => {
        const updatedOptions = updateOptions(currentOptions, options);
        updateChartRef(updatedOptions);
        return updatedOptions;
      });
    },
    [updateChartRef],
  );

  useEffect(() => {
    setChartOptions(currentOptions => {
      const updatedOptions = {
        ...currentOptions,
        color: chartSeriesColors[theme],
      };
      updateChartRef(updatedOptions);
      return updatedOptions;
    });
  }, [theme]);

  return {
    chartOptions,
    updateChartOptions,
    addChartSeries,
    removeChartSeries,
    chartRef,
  };
}
