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

//TODO: move this to a separate file
const colors = [
  '#016BF8',
  '#00A35C',
  '#FFC010',
  '#DB3030',
  '#5E0C9E',
  '#1254B7',
  '#00684A',
  '#944F01',
  '#970606',
  '#2D0B59',
  '#0498EC',
  '#00ED64',
  '#FFEC9E',
  '#FF6960',
  '#B45AF2',
];

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
      series: series.map(
        (seriesOption: LineSeriesOption, index): LineSeriesOption => ({
          type: 'line',
          showSymbol: false,
          clip: false,
          z: index,
          ...seriesOption,
        }),
      ),
      animation: false, // Disabled to optimize performance
      title: {
        show: true,
        text: label,
        padding: 20,
        textStyle: {
          color: palette.black,
          fontFamily: fontFamilies.default,
        },
      },
      color: colors,
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
        ...xAxis,
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
        ...yAxis,
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
  }, [series, label, xAxis, yAxis, darkMode]);

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
