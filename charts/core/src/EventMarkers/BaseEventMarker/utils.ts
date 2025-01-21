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
import { infoIcon, warningIcon } from '../iconsSvgPaths';

import { EventLevel, GetMarkConfigProps } from './BaseEventMarker.types';

export function getMarkConfig({
  name,
  theme,
  label,
  message,
  level,
  position,
  type,
}: GetMarkConfigProps): SeriesOption {
  const labelConfig = {
    borderRadius: borderRadius[200],
    backgroundColor:
      color[theme].background[Variant.InversePrimary][InteractionState.Default],
    color: color[theme].text[Variant.InversePrimary][InteractionState.Default],
    fontFamily: fontFamilies.default,
    fontSize: 12,
    fontWeight: fontWeights.regular,
    formatter: label
      ? `{label|${label}}\n{message|${message}}`
      : `{message|${message}}`,
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
          focus: 'series',
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
          focus: 'series',
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
