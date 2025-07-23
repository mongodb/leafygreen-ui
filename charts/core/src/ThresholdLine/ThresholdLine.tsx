import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { SeriesOption } from '../Chart';
import { useChartContext } from '../ChartContext';

import { svgSymbolPath } from './svgSymbolPath';
import {
  GetThresholdLineConfig,
  ThresholdLineProps,
} from './ThresholdLine.types';

function getThresholdLineConfig({
  name,
  position,
  theme,
  label,
  value,
}: GetThresholdLineConfig): SeriesOption {
  return {
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markLine: {
      data: [
        {
          name: name,
          yAxis: position,
          emphasis: {
            label: {
              show: true,
            },
            lineStyle: {
              width: 1,
            },
          },
        },
      ],
      label: {
        borderRadius: borderRadius[200],
        distance: spacing[300],
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        color:
          color[theme].text[Variant.InversePrimary][InteractionState.Default],
        fontFamily: fontFamilies.default,
        fontSize: 12,
        fontWeight: fontWeights.regular,
        formatter: label ? `{label|${label}:} ${value}` : value,
        lineHeight: 20,
        padding: spacing[150],
        position: 'insideEnd',
        rich: {
          label: {
            color:
              color[theme].text[Variant.InverseSecondary][
                InteractionState.Default
              ],
          },
        },
        show: false, // Needed so it only shows on hover (aka emphasis)
      },
      lineStyle: {
        color: color[theme].icon[Variant.Error][InteractionState.Default],
        type: 'dashed',
        width: 1,
      },
      silent: false,
      symbol: ['none', svgSymbolPath],
      symbolOffset: [
        // Allowed format. See https://echarts.apache.org/en/option.html#series-line.markLine.symbolOffset
        // @ts-ignore Type '[number, number]' is not assignable to type 'string | number'.
        [0, 0],
        // @ts-ignore Type '[number, number]' is not assignable to type 'string | number'.
        [-3, 0], // Needed to move array to be flesh with the last vertical line
      ],
      symbolSize: [7, 10],
      symbolRotate: 360,
    },
  };
}

export function ThresholdLine({ position, label, value }: ThresholdLineProps) {
  const {
    chart: { addSeries, ready, removeSeries },
  } = useChartContext();
  const { theme } = useDarkMode();

  const name = `threshold-${position}`;

  useEffect(() => {
    if (!ready) return;

    /**
     * Threshold lines in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a ChartTooltip.
     */
    addSeries(getThresholdLineConfig({ name, position, theme, label, value }));

    return () => {
      removeSeries(name);
    };
  }, [addSeries, label, name, position, ready, removeSeries, theme, value]);

  return null;
}
