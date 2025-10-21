import React, { useCallback } from 'react';

import { EChartSeriesOptions, StylingContext } from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export type BarProps = SeriesProps & {
  /**
   * Stack name for the series. Series with the same stack name are stacked together.
   */
  stack?: string;
};

export const Bar = (props: BarProps) => {
  const options = useCallback<
    (stylingContext: StylingContext) => EChartSeriesOptions['bar']['options']
  >(
    stylingContext => ({
      clip: false,
      stack: props.stack,
      emphasis: {
        focus: 'self',
      },
      itemStyle: {
        color: stylingContext.seriesColor,
      },
    }),
    [props.stack],
  );

  return (
    <Series
      type={'bar'}
      name={props.name}
      data={props.data}
      options={options}
    />
  );
};

Bar.displayName = 'Bar';
