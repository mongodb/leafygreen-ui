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

import { YAxisProps, YAxisType } from './YAxis.types';

const getOptions = ({
  theme,
  type,
  label,
  unit,
}: YAxisProps & { theme: Theme }): Partial<ChartOptions> => {
  const options: Partial<ChartOptions> = {
    yAxis: {
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
        align: 'right',
        margin: spacing[200],
        formatter:
          unit && type === YAxisType.Value
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
        padding: [0, 0, spacing[800], 0],
        color: color[theme].text[Variant.Secondary][InteractionState.Default],
      },
      nameGap: spacing[900],
    },
  };

  if (label) {
    options.grid = {
      left: spacing[1200],
    };
  } else {
    options.grid = {
      left: spacing[300], // Default left spacing
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
 * React component that can render an y-axis on a parent chart.
 *
 * This is done by updating the parent chart's canvas configuration received via context.
 *
 * ```
 * <Chart>
 *   <YAxis
 *     type="value",
 *     label="My Y-Axis Data",
 *     unit="GB"
 *   />
 * </Chart>
 */
export function YAxis({ type, label, unit }: YAxisProps) {
  const { updateChartOptions } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    updateChartOptions(getOptions({ type, label, unit, theme }));

    return () => {
      /**
       * Hides the axis when the component is unmounted.
       */
      updateChartOptions({
        yAxis: unsetAxisOptions,
      });
    };
  }, [type, label, unit, theme, updateChartOptions]);

  return null;
}
