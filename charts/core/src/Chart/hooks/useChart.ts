import { useEffect, useRef, useState } from 'react';
import { LineChart as EchartsLineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import debounce from 'lodash.debounce';

import { Theme } from '@leafygreen-ui/lib';

import { ChartOptions, SeriesOption } from '../../Chart/Chart.types';
import { chartSeriesColors } from '../chartSeriesColors';
import { getDefaultChartOptions } from '../config';

import { addSeries, removeSeries, updateOptions } from './updateUtils';

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
]);

interface ChartHookProps {
  onChartReady?: () => void;
  theme: Theme;
}

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChart({ theme, onChartReady }: ChartHookProps) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<echarts.EChartsType | undefined>();
  const [chartOptions, setChartOptions] = useState(
    getDefaultChartOptions(theme),
  );

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;
    chartInstance.setOption(chartOptions);

    // ECharts does not automatically resize when the window resizes.
    const resizeHandler = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resizeHandler);

    if (onChartReady) {
      chartInstance.on('finished', onChartReady);
    }

    return () => {
      window.removeEventListener('resize', resizeHandler);
      chartInstance.dispose();
    };
  }, []);

  const updateChartRef = debounce((chartOptions: Partial<ChartOptions>) => {
    console.log('Option Set');
    chartInstanceRef.current?.setOption(chartOptions);
  }, 50);

  const addChartSeries = (data: SeriesOption) => {
    setChartOptions(currentOptions => {
      const updatedOptions = addSeries(currentOptions, data);
      updateChartRef(updatedOptions);
      return updatedOptions;
    });
  };

  const removeChartSeries = (name: string) => {
    setChartOptions(currentOptions => {
      const updatedOptions = removeSeries(currentOptions, name);
      updateChartRef(updatedOptions);
      return updatedOptions;
    });
  };

  const updateChartOptions = (
    options: Omit<Partial<ChartOptions>, 'series'>,
  ) => {
    setChartOptions(currentOptions => {
      const updatedOptions = updateOptions(currentOptions, options);
      updateChartRef(updatedOptions);
      return updatedOptions;
    });
  };

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
