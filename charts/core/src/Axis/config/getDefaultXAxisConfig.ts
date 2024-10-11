import { Theme } from '@leafygreen-ui/lib';
import {
  spacing,
  fontFamilies,
  fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';

export const getDefaultXAxisConfig = (theme: Theme) => ({
  type: 'value',
  splitLine: {
    show: false,
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: color[theme].border[Variant.Secondary][InteractionState.Default],
      width: 1,
    },
  },
  axisLabel: {
    align: 'center',
    margin: spacing[400],
    fontFamily: fontFamilies.default,
    fontWeight: fontWeights.medium,
    fontSize: 11,
    lineHeight: spacing[400],
    color: color[theme].text[Variant.Secondary][InteractionState.Default],
  },
  axisTick: {
    show: false,
  },
  min: 0,
  max: 100,
});
