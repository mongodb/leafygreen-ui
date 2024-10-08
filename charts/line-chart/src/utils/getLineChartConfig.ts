import { LineSeriesOption } from 'echarts/charts';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  spacing,
  fontFamilies,
  fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';

import _ from 'lodash';
import { SeriesOptions } from '../LineChart/LineChart.types';

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

const getBaseAxisConfig = (theme: Theme) => ({
  axisLine: {
    show: true,
    lineStyle: {
      color: color[theme].border[Variant.Secondary][InteractionState.Default],
      width: 1,
    },
  },
  axisLabel: {
    fontFamily: fontFamilies.default,
    fontWeight: fontWeights.medium,
    fontSize: 11,
    lineHeight: spacing[400],
    color: color[theme].text[Variant.Secondary][InteractionState.Default],
  },
  axisTick: {
    show: false,
  },
});

export function getLineChartConfig({
  series,
  theme,
}: {
  series: SeriesOptions;
  theme: Theme;
}) {
  return {
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
      backgroundColor:
        color[theme].background[Variant.InversePrimary][
          InteractionState.Default
        ],
      borderRadius: borderRadius[150],
    },
    xAxis: {
      ..._.merge(getBaseAxisConfig(theme), {
        type: 'time',
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          align: 'center',
          margin: spacing[300],
        },
      }),
    },
    yAxis: {
      ..._.merge(getBaseAxisConfig(theme), {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color:
              color[theme].border[Variant.Secondary][InteractionState.Default],
            width: 1,
          },
        },
        axisLabel: {
          align: 'right',
          margin: spacing[150],
        },
      }),
    },
    grid: {
      left: 0,
      right: spacing[25],
      top: spacing[150], // Accounts for y-axis label height
      bottom: 0,
      borderColor:
        color[theme].border[Variant.Secondary][InteractionState.Default],
      borderWidth: 1,
      containLabel: true,
      show: true,
    },
  };
}
