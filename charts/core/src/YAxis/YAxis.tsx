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

import { type ChartOptions } from '../Chart';
import { useChartContext } from '../ChartContext';

import { YAxisProps } from './YAxis.types';

const getOptions = ({
  theme,
  type,
  label,
  formatter,
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
        formatter,
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
 *     formatter="{value}GB"
 *   />
 * </Chart>
 */
export function YAxis({ type, label, formatter }: YAxisProps) {
  const {
    chart: { ready, updateOptions },
  } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!ready) return;

    updateOptions(getOptions({ type, label, formatter, theme }));

    return () => {
      /**
       * Hides the axis when the component is unmounted.
       */
      updateOptions({
        yAxis: { ...unsetAxisOptions },
      });
    };
  }, [formatter, label, ready, theme, type, updateOptions]);

  return null;
}
