import { useEffect } from 'react';
import { useChartContext } from '../ChartContext';
import { SeriesOption } from '../Chart';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { infoIcon, warningIcon } from './iconsSvgPaths';

const EventType = {
  Warning: 'warning',
  Info: 'info',
} as const;
type EventType = (typeof EventType)[keyof typeof EventType];

function getMarkLineConfig({
  name,
  point,
  theme,
  label,
  type,
}: {
  name: string;
  point: number;
  theme: Theme;
  label: string;
  type: EventType;
}): SeriesOption {
  return {
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markLine: {
      data: [
        {
          name: name,
          xAxis: point,
          emphasis: {
            label: {
              show: true,
            },
            lineStyle: {
              width: 2, // needed to show line but style actually controlled by LineStyle
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
        formatter: label,
        lineHeight: 20,
        padding: spacing[150],
        position: 'start',
        show: false, // Needed so it only shows on hover (aka emphasis)
      },
      lineStyle: {
        color:
          type === EventType.Warning
            ? color[theme].icon[Variant.Error][InteractionState.Default]
            : color[theme].icon[Variant.Primary][InteractionState.Default],
        type: 'solid',
        width: 1,
      },
      silent: false,
      symbol:
        type === EventType.Warning ? [warningIcon, 'none'] : [infoIcon, 'none'],
      symbolSize: [17, 17],
      symbolRotate: 360,
    },
  };
}

export function EventMarker({
  point,
  label,
  type = EventType.Warning,
}: {
  point: number;
  label: string;
  type?: EventType;
}) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name = `threshold-${point}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(getMarkLineConfig({ name, point, theme, label, type }));

    return () => {
      /**
       * Remove...
       */
      chart.removeSeries(name);
    };
  }, [theme, chart.ready, point]);

  return null;
}
