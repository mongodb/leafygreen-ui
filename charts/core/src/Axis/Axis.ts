import { CartesianAxisOption } from 'echarts/types/src/coord/cartesian/AxisModel.js';

import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { type AxisProps } from './Axis.types';

export const getAxisOptions = (
  theme: Theme,
  props: AxisProps,
): CartesianAxisOption => {
  const { label, type } = props;

  const { data, min, max, formatter } =
    type === 'category'
      ? {
          data: props.data,
          min: undefined,
          max: undefined,
          formatter: undefined,
        }
      : {
          data: undefined,
          min: props.min,
          max: props.max,
          formatter: props.formatter,
        };

  return {
    type,
    min,
    max,
    data,
    axisLine: {
      show: true,
      lineStyle: {
        color: color[theme].border[Variant.Secondary][InteractionState.Default],
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
      color: color[theme].text[Variant.Secondary][InteractionState.Default],
    },
  };
};

export const unsetAxisOptions = {
  axisLine: {
    show: false,
  },
  axisLabel: {
    show: false,
  },
};
