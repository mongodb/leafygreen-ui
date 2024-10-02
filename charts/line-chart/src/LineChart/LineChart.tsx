import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  LineChart as EchartsLineChart,
  LineSeriesOption,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { palette } from '@leafygreen-ui/palette';

import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  spacing,
  fontFamilies,
  color,
  Variant,
  State,
} from '@leafygreen-ui/tokens';

import { LineChartProps } from './LineChart.types';
import { baseStyles } from './LineChart.styles';

// Register the required components. By using separate imports, we can avoid
// importing the entire echarts library which will reduce the bundle size.
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  EchartsLineChart,
  CanvasRenderer,
]);

// TODO: This will be passed as a prop
const testSeries = [
  {
    name: 'Dataset 1',
    data: [
      [new Date('2021-01-01T00:00:00'), 50],
      [new Date('2021-01-01T01:00:00'), 60],
      [new Date('2021-01-01T02:00:00'), 70],
    ],
  },
  {
    name: 'Dataset 2',
    data: [
      [new Date('2021-01-01T00:00:00'), 100],
      [new Date('2021-01-01T01:00:00'), 40],
      [new Date('2021-01-01T02:00:00'), 80],
    ],
  },
];

export function LineChart({
  series,
  label,
  xAxis,
  yAxis,
  showControls,
  onInfoClick,
  onClose,
  onExpand,
  onDrag,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  darkMode,
  ...rest
}: LineChartProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      series: testSeries.map(
        (seriesOption: LineSeriesOption): LineSeriesOption => ({
          type: 'line',
          showSymbol: false,
          clip: false,
          ...seriesOption,
        }),
      ),
      animation: false, // Disabled to optimize performance
      title: {
        show: true,
        text: 'Chart Title', // TODO: This will be passed as a prop
        padding: 20,
        textStyle: {
          color: palette.black,
          fontFamily: fontFamilies.default,
        },
      },
      toolbox: {
        orient: 'vertical',
        // sizes set so that the toolbox is out of view
        itemSize: 13,
        top: 15,
        right: -6,
        feature: {
          dataZoom: {
            icon: {
              zoom: 'path://', // hack to remove zoom button which renders by default when zoom is enabled
              back: 'path://', // hack to remove restore button which renders by default when zoom is enabled
            },
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        // TODO: Will set darkMode via prop in later PR
        backgroundColor:
          color[Theme.Light].background[Variant.InversePrimary][State.Default],
        borderRadius: borderRadius[150],
      },
      xAxis: {
        type: 'time',
        splitLine: { show: true },
        axisLine: {
          lineStyle: {
            color: palette.gray.light2,
          },
        },
        axisLabel: {
          textStyle: {
            color: palette.gray.dark1,
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: true },
        axisLine: {
          lineStyle: {
            color: palette.gray.light2,
          },
        },
        axisLabel: {
          textStyle: {
            color: palette.gray.dark1,
          },
        },
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: spacing[1000],
        right: spacing[500],
        top: spacing[1600],
        bottom: spacing[500],
        containLabel: true,
        show: true,
      },
    };

    chartInstance.setOption(option);

    // This enables zooming by default without the need to click a zoom button in the toolbox.
    chartInstance.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    });

    // ECharts does not automatically resize when the window resizes so we need to handle it manually.
    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div className={baseStyles} {...rest}>
      {/* Chart will fill 100% of width of the container on render */}
      <div
        ref={chartRef}
        className="echart"
        style={{
          width: '100%',
          height: '100%',
          // TODO: Will set darkMode via prop in later PR
          border: `1px solid ${
            color[Theme.Light].border[Variant.Disabled][State.Default]
          }`,
          borderRadius: borderRadius[200],
        }}
      />
    </div>
  );
}

LineChart.displayName = 'LineChart';
