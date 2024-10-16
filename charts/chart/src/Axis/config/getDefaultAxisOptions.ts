import { Theme } from '@leafygreen-ui/lib';
import {
  spacing,
  fontFamilies,
  fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';
import { ChartOptions } from '../../Chart/Chart.types';

const getFontStyles = (theme: Theme) => ({
  fontFamily: fontFamilies.default,
  fontWeight: fontWeights.medium,
  fontSize: 11,
  lineHeight: spacing[400],
  color: color[theme].text[Variant.Secondary][InteractionState.Default],
});

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
    ...getFontStyles(theme),
  },
  axisTick: {
    show: false,
  },
  nameLocation: 'middle',
  nameTextStyle: {
    ...getFontStyles(theme),
  },
});

export const getDefaultXAxisOptions = (theme: Theme): Partial<ChartOptions> => {
  const commonOptions = getCommonAxisOptions(theme);
  return {
    xAxis: {
      ...commonOptions,
      axisLabel: {
        ...commonOptions.axisLabel,
        align: 'center',
        margin: spacing[400],
      },
      nameGap: spacing[1000],
    },
  };
};

export const getDefaultYAxisOptions = (theme: Theme): Partial<ChartOptions> => {
  const commonOptions = getCommonAxisOptions(theme);
  return {
    yAxis: {
      ...commonOptions,
      axisLabel: {
        ...commonOptions.axisLabel,
        align: 'right',
        margin: spacing[200],
      },
      nameGap: spacing[900],
    },
  };
};
