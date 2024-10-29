import { useEffect, useState } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { ChartOptions } from '../../Chart/Chart.types';
import { YAxisProps, YAxisType } from '../YAxis.types';

const getOptions = ({
  theme,
  type,
  label,
  unit,
}: YAxisProps & { theme: Theme }): Partial<ChartOptions> => {
  const options: Partial<ChartOptions> = {
    yAxis: {
      type: type,
      axisLine: {
        show: true,
        lineStyle: {
          color:
            color[theme].border[Variant.Secondary][InteractionState.Default],
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
        align: 'right',
        margin: spacing[200],
        formatter:
          unit && type === YAxisType.Value
            ? (value: string) => `${value}${unit}`
            : undefined,
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
        lineHeight: spacing[400],
        color: color[theme].text[Variant.Secondary][InteractionState.Default],
      },
      nameGap: spacing[900],
    },
  };

  return options;
};

export const useYAxisOptions = ({
  type,
  label,
  unit,
}: YAxisProps): Partial<ChartOptions> => {
  const [options, setOptions] = useState<Partial<ChartOptions>>({});
  const { theme } = useDarkMode();

  useEffect(() => {
    setOptions(getOptions({ theme, type, label, unit }));
  }, [theme, type, label, unit]);

  return options;
};
