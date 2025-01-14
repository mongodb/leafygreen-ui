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

import { SeriesOption } from '../Chart';

import { infoIcon, warningIcon } from './iconsSvgPaths';

const EventLevel = {
  Warning: 'warning',
  Info: 'info',
} as const;
type EventLevel = (typeof EventLevel)[keyof typeof EventLevel];

export function getMarkLineConfig({
  name,
  theme,
  label,
  level,
  isPoint = false,
  point,
  position,
}: {
  name: string;
  theme: Theme;
  label: string;
  level: EventLevel;
  isPoint?: boolean;
  point?: string | number;
  position?: [string | number | Date, string | number | Date];
}): SeriesOption {
  const dataItem = {
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
  };

  if (isPoint) {
    dataItem.coord = position;
  } else {
    dataItem.xAxis = point;
  }

  return {
    name,
    type: 'line', // Requires a type even though it's not an actual series
    markLine: {
      data: [dataItem],
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
          level === EventLevel.Warning
            ? color[theme].icon[Variant.Error][InteractionState.Default]
            : color[theme].icon[Variant.Primary][InteractionState.Default],
        type: 'solid',
        width: 1,
      },
      silent: false,
      symbol:
        level === EventLevel.Warning
          ? [warningIcon, 'none']
          : [infoIcon, 'none'],
      symbolSize: [17, 17],
      symbolRotate: 360,
    },
  };
}
