import React, { useCallback } from 'react';

import { EChartSeriesOptions, StylingContext } from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export type BarProps = SeriesProps & {
  /**
   * Stack name for the series. Series with the same stack name are stacked together.
   */
  stack?: string;

  /**
   * Hover focus behavior for the series.
   * - `self`: Upon hovering over a bar, all other bars will be dimmed.
   * - `none`: Other bars will not be affected by the hover.
   */
  emphasis?: 'self';
};

export const Bar = ({ name, data, stack, emphasis }: BarProps) => {
  const options = useCallback<
    (stylingContext: StylingContext) => EChartSeriesOptions['bar']['options']
  >(
    stylingContext => ({
      clip: false,
      stack,
      emphasis: {
        focus: emphasis,
      },
      itemStyle: {
        color: stylingContext.seriesColor,
      },
    }),
    [stack, emphasis],
  );

  return <Series type="bar" name={name} data={data} options={options} />;
};

Bar.displayName = 'Bar';
