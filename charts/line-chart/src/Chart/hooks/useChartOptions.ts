import _ from 'lodash';
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
// import { LineSeriesOption } from 'echarts/charts';
import { ChartProps, SeriesOption } from '../Chart.types';
import { colors } from '../colors';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

/**
 * Returns default options that are shared by both the x and y axis.
 */
const getDefaultAxisOptions = (theme: Theme) => ({
  /**
   * Sets and styles the grid lines that run perpendicular to the axis.
   */
  splitLine: {
    show: true,
    lineStyle: {
      color: color[theme].border[Variant.Secondary][InteractionState.Default],
      width: 1,
    },
  },
  /**
   * Sets and styles the axis line.
   */
  axisLine: {
    show: true,
    lineStyle: {
      color: color[theme].border[Variant.Secondary][InteractionState.Default],
      width: 1,
    },
  },
  /**
   * Sets and styles the axis labels.
   */
  axisLabel: {
    fontFamily: fontFamilies.default,
    fontWeight: fontWeights.medium,
    fontSize: 11,
    lineHeight: spacing[400],
    color: color[theme].text[Variant.Secondary][InteractionState.Default],
  },
  /**
   * Hides the axis tick marks.
   */
  axisTick: {
    show: false,
  },
});

/**
 * Returns default chart options that are shared by all charts.
 */
const getDefaultOptions = (theme: Theme) => ({
  /**
   * Disables animation to optimize performance.
   */
  animation: false,

  /**
   * Hides title. Title is rendered in ChartHeader instead.
   */
  title: {
    show: false,
  },

  /**
   * Sets the color of the lines/series that get render on the chart.
   */
  color: colors[theme],

  /**
   * Toolbox needs to be set to allow zooming. By default it adds buttons to the chart
   * that we don't want to show. We hide the buttons by positioning them off the chart
   * because there's no way to hide them out of the box.
   */
  toolbox: {
    orient: 'vertical',
    itemSize: 13,
    top: 15,
    right: -6,

    /**
     * Specifically allows zooming and removes the default zoom and restore buttons by
     * setting their icons to empty strings.
     */
    feature: {
      dataZoom: {
        icon: {
          zoom: 'path://', // hack to remove zoom button
          back: 'path://', // hack to remove restore button
        },
      },
    },
  },

  /**
   * Adds tooltip and custom styling.
   */
  tooltip: {
    trigger: 'axis',
    backgroundColor:
      color[theme].background[Variant.InversePrimary][InteractionState.Default],
    borderRadius: borderRadius[150],
  },

  /**
   * Adds styling to grid of chart.
   */
  grid: {
    left: spacing[50], // Added to prevent label cutoff occurring in canvas
    right: spacing[25], // Added to prevent border cutoff occurring in canvas
    top: spacing[200], // Accounts for y-axis topmost label line height
    bottom: 0,
    borderColor:
      color[theme].border[Variant.Secondary][InteractionState.Default],
    borderWidth: 1,
    containLabel: true,
    show: true,
  },

  /**
   * Adds options specifically to the x-axis.
   */
  xAxis: _.merge(getDefaultAxisOptions(theme), {
    /**
     * Hides the grid lines that run perpendicular to the y-axis within the chart.
     */
    splitLine: {
      show: false,
    },
    /**
     * Adds styling specific to the x-axis labels.
     */
    axisLabel: {
      align: 'center',
      margin: spacing[400],
    },
  }),

  /**
   * Adds options specifically to the y-axis.
   */
  yAxis: _.merge(getDefaultAxisOptions(theme), {
    /**
     * Adds styling specific to the y-axis labels.
     */
    axisLabel: {
      align: 'right',
      margin: spacing[200],
    },
  }),
});

/**
 * Default options that are shared by all series.
 */
const defaultSeriesOption = {
  showSymbol: false,
  symbol: 'circle',
  clip: false,
  emphasis: {
    disabled: true,
  },
};

/**
 * Creates a generic Apache ECharts options object with default values for those not set
 * that are in line with the designs and needs of the design system.
 */
export function useChartOptions({
  options,
  darkMode: darkModeProp,
}: ChartProps) {
  const { theme } = useDarkMode(darkModeProp);

  const optionsWithDefaultSeriesProps = {
    ...options,
    series: options.series.map((seriesOption: SeriesOption) =>
      _.merge({ ...defaultSeriesOption }, seriesOption),
    ),
  };

  return _.merge(getDefaultOptions(theme), optionsWithDefaultSeriesProps);
}
