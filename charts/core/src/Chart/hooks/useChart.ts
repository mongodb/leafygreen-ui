import { useCallback, useEffect, useReducer, useRef } from 'react';
import {
  ChartActionType,
  ChartOptions,
  SeriesOption,
} from '../../Chart/Chart.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { chartReducer, getDefaultChartOptions } from '../config';
import { DarkModeProps } from '@leafygreen-ui/lib';

import * as echarts from 'echarts/core';
import { LineChart as EchartsLineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import debounce from 'lodash.debounce';

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

interface ChartHookProps extends DarkModeProps {
  onChartReady?: () => void;
}

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChart({
  darkMode: darkModeProp,
  onChartReady,
}: ChartHookProps) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<echarts.EChartsType | undefined>();
  const { theme } = useDarkMode(darkModeProp);
  const [chartOptions, dispatch] = useReducer(
    chartReducer,
    getDefaultChartOptions(theme),
  );

  const addSeries = useCallback((data: SeriesOption) => {
    dispatch({ type: ChartActionType.addSeries, data });
  }, []);

  const removeSeries = useCallback((name: string) => {
    dispatch({ type: ChartActionType.removeSeries, name });
  }, []);

  const updateChartOptions = useCallback(
    (options: Omit<Partial<ChartOptions>, 'series'>) => {
      dispatch({ type: ChartActionType.updateOptions, options });
    },
    [],
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

  useEffect(
    debounce(() => {
      chartInstanceRef.current?.setOption(chartOptions);
    }, 50),
    [chartOptions],
  );

  return {
    chartOptions,
    updateChartOptions,
    addSeries,
    removeSeries,
    chartRef,
  };
}
