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

import { XAxisProps } from './XAxis.types';

const getOptions = ({
  theme,
  type,
  label,
  formatter,
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
 *     formatter="{value}GB"
 *   />
 * </Chart>
 */
export function XAxis({ type, label, formatter }: XAxisProps) {
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
        xAxis: { ...unsetAxisOptions },
      });
    };
  }, [formatter, label, ready, theme, type, updateOptions]);

  return null;
}
