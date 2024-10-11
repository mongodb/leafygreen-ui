import _, { set } from 'lodash';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  spacing,
  fontFamilies,
  fontWeights,
  color,
  Variant,
  InteractionState,
} from '@leafygreen-ui/tokens';
import { useChartContext } from '../ChartOptionsContext';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { ChartOptions } from '../Chart/Chart.types';

export const getDefaultAxisOptions = (theme: Theme) => ({
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

export function XAxis() {
  const { chartOptions, updateChartOptions, darkMode } = useChartContext();
  const { theme } = useDarkMode(darkMode);

  console.log('XAxis rendered');

  useEffect(() => {
    const updatedOptions: Partial<ChartOptions> = {
      xAxis: getDefaultAxisOptions(theme),
    };

    if (!chartOptions.yAxis) {
      updatedOptions.yAxis = { show: false };
    }

    updateChartOptions(updatedOptions);
  }, [theme]);

  return null;
}
