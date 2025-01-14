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

import { SeriesOption } from '../../Chart';
import { useChartContext } from '../../ChartContext';
import { infoIcon, warningIcon } from '../iconsSvgPaths';

import { BaseEventMarkerProps, EventLevel } from './BaseEventMarker.types';

export function getMarkConfig({
  name,
  theme,
  label,
  message,
  level,
  position,
  type,
}: BaseEventMarkerProps): SeriesOption {
  const labelConfig = {
    borderRadius: borderRadius[200],
    backgroundColor:
      color[theme].background[Variant.InversePrimary][InteractionState.Default],
    color: color[theme].text[Variant.InversePrimary][InteractionState.Default],
    fontFamily: fontFamilies.default,
    fontSize: 12,
    fontWeight: fontWeights.regular,
    formatter: [`{label|${label}}`, `{message|${message}}`].join('\n'),
    lineHeight: 15,
    padding: spacing[150],
    position: type === 'line' ? 'start' : 'bottom',
    rich: {
      label: {
        color:
          color[theme].text[Variant.InverseSecondary][InteractionState.Default],
        align: 'left',
      },
      message: {
        align: 'left',
      },
    },
    show: false, // Needed so it only shows on hover (aka emphasis)
  };

  const commonConfig = {
    animation: false,
    name,
    type: 'line', // Requires a type even though it's not an actual series
  };

  if (type === 'line') {
    return {
      ...commonConfig,
      markLine: {
        label: labelConfig,
        data: [
          {
            name: name,
            xAxis: position as string | number,
          },
        ],
        emphasis: {
          label: {
            show: true,
          },
          lineStyle: {
            width: 2,
          },
        },
        lineStyle: {
          color:
            level === EventLevel.Warning
              ? color[theme].icon[Variant.Error][InteractionState.Default]
              : color[theme].icon[Variant.Primary][InteractionState.Default],
          type: 'solid',
          width: 1,
        },
        symbol:
          level === EventLevel.Warning
            ? [warningIcon, 'none']
            : [infoIcon, 'none'],
        symbolSize: [16, 16],
        symbolRotate: 360, // Icon shows upside down without this
      },
    } as SeriesOption;
  } else {
    return {
      ...commonConfig,
      markPoint: {
        label: labelConfig,
        data: [
          {
            name: name,
            coord: position as [string | number, string | number],
          },
        ],
        emphasis: {
          label: {
            show: true,
          },
        },
        symbolSize: [16, 16],
        symbol: level === EventLevel.Warning ? warningIcon : infoIcon,
      },
    } as SeriesOption;
  }
}

export function BaseEventMarker({
  position,
  label,
  message,
  level = EventLevel.Warning,
  type,
}: Omit<BaseEventMarkerProps, 'name' | 'theme'> & { type: 'line' | 'point' }) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const name = `event-marker-${position}`;

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Threshold lines/Points in Echarts are always attached to a series. In order
     * to make this a separate component and not a prop on `Line`, we must add
     * a dummy series with no data, and a mark line. This does not show up as a
     * series in something like a Tooltip.
     */
    chart.addSeries(
      getMarkConfig({ name, theme, label, message, level, position, type }),
    );

    return () => {
      chart.removeSeries(name);
    };
  }, [theme, chart.ready, position, label, message, level, type]);

  return null;
}
