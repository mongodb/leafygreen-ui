import React, { useCallback } from 'react';

import { EChartSeriesOptions, StylingContext } from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export const BarHoverBehavior = {
  DimOthers: 'dim-others',
  None: 'none',
} as const;

export type BarHoverBehavior =
  (typeof BarHoverBehavior)[keyof typeof BarHoverBehavior];

function getEmphasisFocus(
  hoverBehavior?: BarHoverBehavior,
): 'series' | 'self' | 'none' | undefined {
  switch (hoverBehavior) {
    case undefined:
      return undefined;
    case BarHoverBehavior.DimOthers:
      return 'self';
    case BarHoverBehavior.None:
      return 'none';
  }
}

export type BarProps = SeriesProps & {
  /**
   * Stack name for the series. Series with the same stack name are stacked together.
   */
  stack?: string;

  /**
   * Hover focus behavior for the series.
   * - `dim_other_bars`: Upon hovering over a bar, all other bars will be dimmed.
   * - `none`: Other bars will not be affected by the hover.
   */
  hoverBehavior?: BarHoverBehavior;
};

export const Bar = ({ name, data, stack, hoverBehavior }: BarProps) => {
  const options = useCallback<
    (stylingContext: StylingContext) => EChartSeriesOptions['bar']['options']
  >(
    stylingContext => ({
      clip: false,
      stack,
      emphasis: {
        focus: getEmphasisFocus(hoverBehavior),
      },
      itemStyle: {
        color: stylingContext.seriesColor,
      },
    }),
    [stack, hoverBehavior],
  );

  return <Series type="bar" name={name} data={data} options={options} />;
};

Bar.displayName = 'Bar';
