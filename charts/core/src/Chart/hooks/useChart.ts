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
import { ChartHookProps } from './useChart.types';

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
  onZoomSelect,
  groupId,
}: ChartHookProps) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<echarts.EChartsType | undefined>();
  const [chartOptions, setChartOptions] = useState(
    getDefaultChartOptions(theme),
  );

  // Initialize the chart
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;
    chartInstance.setOption(chartOptions);

    // Connects a chart to a group which allows for synchronized tooltips
    if (groupId) {
      chartInstance.group = groupId;
      echarts.connect(groupId);
    }

    // ECharts does not automatically resize when the window resizes.
    const resizeHandler = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resizeHandler);

    function onInitialRender() {
      /**
       * IMPORTANT NOTE: We use the presence of the handler to determine if the zoom click
       * and drag is enabled or not. This is an exception! Typically we'd want a `zoomable` prop,
       * or something similar to enable/disable, and a handler just to handle the action.
       * We don't want to set a precedent with the pattern of implying functionality (like
       * the click and drag action) based on the presence of a handler like this.
       * This was deemed an exception to the rule due to the fact that the data is always
       * controlled and there never exists a scenario where one would be useful without the other.
       */
      if (onZoomSelect) {
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

        chartInstance.on('dataZoom', (params: any) => {
          if (params.batch) {
            const xAxisIndex = 0;
            const yAxisIndex = 1;

            const { startValue: xStart, endValue: xEnd } =
              params.batch[xAxisIndex];
            const { startValue: yStart, endValue: yEnd } =
              params.batch[yAxisIndex];

            onZoomSelect({
              xAxis: { startValue: xStart, endValue: xEnd },
              yAxis: { startValue: yStart, endValue: yEnd },
            });
          }

          /**
           * If start is not 0% or end is not 100%, that means that the 'dataZoom'
           * event was triggered by an actual zoom. Since we don't want to actually
           * zoom on the current data, but rather provide the new values to the passed
           * in handler, we dispatch an action to essentially override the zoom.
           */
          const isZoomed = params?.start !== 0 || params?.end !== 100;

          if (isZoomed) {
            chartInstance.dispatchAction({
              type: 'dataZoom',
              start: 0, // percentage of starting position
              end: 100, // percentage of ending position
            });
          }
        });
      }

      if (onChartReady) {
        onChartReady();
      }

      // Remove so it doesn't get called on every render
      chartInstance.off('rendered', onInitialRender);
    }

    chartInstance.on('rendered', onInitialRender);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      chartInstance.dispose();
    };
  }, [chartOptions, onChartReady, onZoomSelect]);

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
