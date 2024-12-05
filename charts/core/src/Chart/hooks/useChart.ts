import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LineChart as EchartsLineChart } from 'echarts/charts';
import {
  DataZoomComponent,
  DataZoomInsideComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import debounce from 'lodash.debounce';

import { ChartOptions, SeriesOption } from '../../Chart/Chart.types';
import { chartSeriesColors } from '../chartSeriesColors';
import { getDefaultChartOptions } from '../config';

import { addSeries, removeSeries, updateOptions } from './updateUtils';
import { ChartHookProps, ZoomSelectionEvent } from './useChart.types';

/**
 * Register the required components. By using separate imports, we can avoid
 * importing the entire echarts library which will reduce the bundle size.
 * Must be added to if additional functionality is supported.
 */
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  EchartsLineChart,
  CanvasRenderer,
  ToolboxComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
]);

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChart({
  theme,
  onChartReady,
  zoomSelect,
  onZoomSelect,
}: ChartHookProps) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<echarts.EChartsType | undefined>();
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
      }
    }

    /**
     * If start is not 0% or end is not 100%, that means that the 'dataZoom'
     * event was triggered by an actual zoom. Since we don't want to actually
     * zoom on the current data, but rather provide the new values to the passed
     * in handler, we dispatch an action to essentially override the zoom.
     */
    const isZoomed = params?.start !== 0 || params?.end !== 100;

    if (chartInstanceRef.current && isZoomed) {
      chartInstanceRef.current.dispatchAction({
        type: 'dataZoom',
        start: 0, // percentage of starting position
        end: 100, // percentage of ending position
      });
    }
  }

  /**
   * Meant to be called once on initial render
   */
  function onInitialRender() {
    if (!chartInstanceRef.current) {
      return;
    }

    const chartInstance = chartInstanceRef.current;

    if (zoomSelect?.xAxis || zoomSelect?.yAxis) {
      /**
       * Zooming is built into echart via the toolbar. By default, a user
       * has to click the "dataZoom" button to enable zooming. We however hide
       * this button and want it turned on by default. This is done by dispatching
       * an action to enable the "dataZoomSelect" feature, as if it were clicked.
       */
      chartInstance.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: true,
      });

      chartInstance.on('dataZoom', handleDataZoom);
    }

    if (onChartReady) {
      onChartReady();
    }

    /**
     * This is only done on initial render because what's inside itself
     * triggers a render which creates an infinite loop if not removed.
     */
    chartInstance.off('rendered', onInitialRender);
  }

  // Initialize the chart
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;
    chartInstance.setOption(chartOptions);

    // ECharts does not automatically resize when the window resizes.
    const resizeHandler = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resizeHandler);

    chartInstance.on('rendered', onInitialRender);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      chartInstance.dispose();
    };
  }, [chartOptions, onChartReady, zoomSelect]);

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
        chartInstanceRef.current?.setOption(chartOptions, true);
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
    chartInstanceRef,
  };
}
