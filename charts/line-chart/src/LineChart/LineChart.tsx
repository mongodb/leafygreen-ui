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
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { palette } from '@leafygreen-ui/palette';
import { Theme } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';
import {
  borderRadius,
  spacing,
  fontFamilies,
  fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';

import { LineChartProps } from './LineChart.types';
import { baseStyles, chartStyles, headerStyles } from './LineChart.styles';

//TODO: move this to a separate file and add dark mode support
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
  ToolboxComponent,
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
          symbol: 'circle',
          emphasis: {
            disabled: true,
          },
          ...seriesOption,
        }),
      ),
      animation: false, // Disabled to optimize performance
      title: {
        show: false,
      },
      color: colors,
      toolbox: {
        orient: 'vertical',
        itemSize: 13,
        top: 15,
        right: -6,
        feature: {
          dataZoom: {
            icon: {
              zoom: 'path://', // hack to remove zoom button
              back: 'path://', // hack to remove restore button
            },
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        // TODO: Will set darkMode via prop in later PR
        backgroundColor:
          color[Theme.Light].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        borderRadius: borderRadius[150],
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color:
              color[Theme.Light].border[Variant.Secondary][
                InteractionState.Default
              ],
            width: 1,
          },
        },
        axisLabel: {
          align: 'center',
          margin: spacing[300],
          fontFamily: fontFamilies.default,
          fontWeight: fontWeights.medium,
          fontSize: 11,
          lineHeight: spacing[400],
          color:
            color[Theme.Light].text[Variant.Secondary][
              InteractionState.Default
            ],
        },
        axisTick: {
          show: false,
        },
        ...xAxis,
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color:
              color[Theme.Light].border[Variant.Secondary][
                InteractionState.Default
              ],
            width: 1,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color:
              color[Theme.Light].border[Variant.Secondary][
                InteractionState.Default
              ],
            width: 1,
          },
        },
        axisLabel: {
          align: 'right',
          margin: spacing[150],
          fontFamily: fontFamilies.default,
          fontWeight: fontWeights.medium,
          fontSize: 11,
          color:
            color[Theme.Light].text[Variant.Secondary][
              InteractionState.Default
            ],
        },
        axisTick: {
          show: false,
        },
        ...yAxis,
      },
      grid: {
        left: 0,
        right: spacing[25],
        top: spacing[150], // Accounts for y-axis label height
        bottom: 0,
        borderColor:
          color[Theme.Light].border[Variant.Secondary][
            InteractionState.Default
          ],
        borderWidth: 1,
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
      <header className={headerStyles}>
        <Body weight="regular" baseFontSize={16}>
          {label}
        </Body>
      </header>
      <div ref={chartRef} className={`echart ${chartStyles}`} />
    </div>
  );
}

LineChart.displayName = 'LineChart';
