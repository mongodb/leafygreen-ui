import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { SeriesOption } from '../../Chart';
import { useChartContext } from '../../ChartContext';
import { EventLevel } from '../EventMarker.types';
import { infoIcon, warningIcon } from '../iconsSvgPaths';

import { EventMarkerPointProps } from './EventMarkerPoint.types';

export function getMarkPointConfig({
  name,
  theme,
  label,
  message,
  level,
  position,
}: {
  name: string;
  theme: Theme;
  label: string;
  message: string;
  level: EventLevel;
  position: [string | number, string | number];
}): SeriesOption {
  return {
    animation: false,
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markPoint: {
      data: [
        {
          name: name,
          coord: position,
        },
      ],
      emphasis: {
        label: {
          show: true,
        },
      },
      label: {
        borderRadius: borderRadius[200],
        distance: 4,
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        color:
          color[theme].text[Variant.InversePrimary][InteractionState.Default],
        fontFamily: fontFamilies.default,
        fontSize: 12,
        fontWeight: fontWeights.regular,
        formatter: [`{label|${label}}`, `{message|${message}}`].join('\n'),
        lineHeight: 15,
        padding: spacing[150],
        position: 'bottom',
        rich: {
          label: {
            color:
              color[theme].text[Variant.InverseSecondary][
                InteractionState.Default
              ],
            align: 'left',
          },
          message: {
            align: 'left',
          },
        },
        show: false, // Only show on hover / emphasis
      },
      symbol: level === EventLevel.Warning ? warningIcon : infoIcon,
      symbolSize: [16, 16],
    },
  };
}

export function EventMarkerPoint({
  position,
  label,
  message,
  level = EventLevel.Warning,
}: EventMarkerPointProps) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name = `event-marker-${position[0]}-${position[1]}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(
      getMarkPointConfig({ name, theme, label, message, level, position }),
    );

    return () => {
      /**
       * Remove...
       */
      chart.removeSeries(name);
    };
  }, [theme, chart.ready, position, label, message, level]);

  return null;
}
