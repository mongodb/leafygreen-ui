import { Theme } from '@leafygreen-ui/lib';
import {
  spacing,
  fontFamilies,
  fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';

const getCommonAxisOptions = (theme: Theme) => ({
  type: 'value',
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
  },
  axisTick: {
    show: false,
  },
});

export const getDefaultXAxisOptions = (theme: Theme) => {
  const commonOptions = getCommonAxisOptions(theme);
  return {
    ...commonOptions,
    axisLabel: {
      ...commonOptions.axisLabel,
      align: 'center',
      margin: spacing[400],
    },
  };
};

export const getDefaultYAxisOptions = (theme: Theme) => {
  const commonOptions = getCommonAxisOptions(theme);
  return {
    ...commonOptions,
    axisLabel: {
      ...commonOptions.axisLabel,
      align: 'right',
      margin: spacing[200],
    },
  };
};
