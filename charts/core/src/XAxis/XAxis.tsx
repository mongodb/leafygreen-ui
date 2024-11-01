import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { ChartOptions } from '../Chart/Chart.types';
import { useChartContext } from '../ChartContext';

import { XAxisProps, XAxisType } from './XAxis.types';

const getOptions = ({
  theme,
  type,
  label,
  unit,
}: XAxisProps & { theme: Theme }): Partial<ChartOptions> => {
  const options: Partial<ChartOptions> = {
    xAxis: {
      type: type,
      axisLine: {
        show: true,
        lineStyle: {
          color:
            color[theme].border[Variant.Secondary][InteractionState.Default],
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        fontFamily: fontFamilies.default,
        fontWeight: fontWeights.medium,
        fontSize: 11,
        lineHeight: spacing[400],
        color: color[theme].text[Variant.Secondary][InteractionState.Default],
        align: 'center',
        margin: spacing[400],
        formatter:
          unit && type === XAxisType.Value
            ? (value: string) => `${value}${unit}`
            : undefined,
      },
      axisTick: {
        show: false,
      },
      name: label,
      nameLocation: 'middle',
      nameTextStyle: {
        fontFamily: fontFamilies.default,
        fontWeight: fontWeights.medium,
        fontSize: 11,
        lineHeight: spacing[400],
        padding: [spacing[200], 0, 0, 0],
        color: color[theme].text[Variant.Secondary][InteractionState.Default],
      },
      nameGap: spacing[1000],
    },
  };

  if (label) {
    options.grid = {
      bottom: spacing[1200], // Pushes out to make room for the label
    };
  } else {
    options.grid = {
      bottom: spacing[400], // Default bottom spacing
    };
  }

  return options;
};

const unsetAxisOptions = {
  axisLine: {
    show: false,
  },
  axisLabel: {
    show: false,
  },
};

/**
 * React component that can render an x-axis on a parent chart.
 *
 * This is done by updating the parent chart's canvas configuration received via context.
 *
 * ```
 * <Chart>
 *   <XAxis
 *     type="time",
 *     label="My X-Axis Data",
 *     unit="GB"
 *   />
 * </Chart>
 */
export function XAxis({ type, label, unit }: XAxisProps) {
  const { updateChartOptions } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    updateChartOptions(getOptions({ type, label, unit, theme }));

    return () => {
      /**
       * Hides the axis when the component is unmounted.
       */
      updateChartOptions({
        xAxis: unsetAxisOptions,
      });
    };
  }, [type, label, unit, theme, updateChartOptions]);

  return null;
}
