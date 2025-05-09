import { colors as chartColors } from '@lg-charts/colors';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { TOOLBOX_ID, X_AXIS_ID, Y_AXIS_ID } from '../../constants';
import { ChartOptions } from '../Chart.types';

const commonAxisOptions = {
  /**
   * Axes need to be hidden explicitly to prevent error when rendering chart without Axis
   */
  splitLine: {
    show: false,
  },
  axisLine: {
    show: false,
  },
  axisLabel: {
    show: false,
  },
  axisTick: {
    show: false,
  },
};

/**
 * Returns default chart options that are shared by all charts.
 */
export const getDefaultChartOptions = (
  theme: Theme,
): Partial<ChartOptions> => ({
  aria: {
    show: true,
  },
  animation: false, // Disabled by default to optimize performance

  title: {
    show: false, // Title is rendered in custom header instead
  },

  color: chartColors[theme],

  /**
   * Though there's a ChartGrid component that will render the grid lines, this allows the box
   * that contains the chart to to show with proper dimensions by default.
   */
  grid: {
    /**
     * Spacing added here instead of in CSS because the grid is rendered in a canvas.
     * Adding the spacing in the canvas assures that the labels and borders are not cutoff.
     */
    left: spacing[300],
    right: spacing[400],
    top: spacing[300],
    bottom: spacing[400],
    borderColor:
      color[theme].border[Variant.Secondary][InteractionState.Default],
    borderWidth: 1,
    containLabel: true,
  },

  xAxis: {
    id: X_AXIS_ID,
    type: 'time',
    ...commonAxisOptions,
  },

  yAxis: {
    id: Y_AXIS_ID,
    type: 'value',
    ...commonAxisOptions,
  },

  // Sets up zooming
  toolbox: {
    id: TOOLBOX_ID,
    feature: {
      dataZoom: {
        show: true,
        icon: {
          zoom: 'path://', // hack to remove zoom button
          back: 'path://', // hack to remove restore button
        },
        brushStyle: {
          color: palette.gray.light1,
          opacity: 0.2,
        },
      },
    },
  },

  // Adds vertical dashed line on hover, even when no tooltip is shown
  tooltip: {
    axisPointer: {
      z: 0, // Prevents dashed emphasis line from being rendered on top of mark lines and labels
    },
    show: true,
    trigger: 'axis',
    formatter: () => '',
  },
});
